import re
import torch
import torch.nn.functional as F
import pandas as pd
from tqdm import tqdm
from torch_geometric.data import Data
from torch_geometric.loader import DataLoader
from torch_geometric.nn import SAGEConv, global_mean_pool
from clang import cindex

# Set libclang path (update this if needed)
cindex.Config.set_library_file(r"C:\Program Files\LLVM\bin\libclang.dll")

device = torch.device('cpu')

# Initialize Clang Index
index = cindex.Index.create()

def generate_ast_clang(source_code, temp_file_path="temp.c"):
    """Generate AST from source code using libclang."""
    try:
        with open(temp_file_path, "w") as temp_file:
            temp_file.write(source_code)
        translation_unit = index.parse(temp_file_path, args=['-std=c99'])
        return translation_unit.cursor
    except Exception as e:
        print(f"Error during parsing: {e}")
        return None

def generate_ast_string(node, depth=0):
    """Convert the AST node to a readable indented string."""
    indent = "  " * depth
    result = f"{indent}{node.kind} {node.spelling}\n"
    for child in node.get_children():
        result += generate_ast_string(child, depth + 1)
    return result

def generate_and_parse_ast_string(source_code):
    """Generate the AST string from C code."""
    try:
        root = generate_ast_clang(source_code)
        if root is not None:
            return generate_ast_string(root)
        else:
            return "Error"
    except Exception as e:
        return f"Error: {e}"

def parse_ast_to_graph(ast_list, label, node_encoder):
    """Convert AST list into a torch_geometric graph."""
    node_ids = [node_encoder.get(node, 0) for node in ast_list]

    x = F.one_hot(torch.tensor(node_ids), num_classes=len(node_encoder)).float()

    edge_index = []
    for i in range(len(node_ids) - 1):
        edge_index.append([i, i + 1])
        edge_index.append([i + 1, i])  # bidirectional

    edge_index = torch.tensor(edge_index).t().contiguous()
    y = torch.tensor([label], dtype=torch.long)

    return Data(x=x, edge_index=edge_index, y=y)

def load_dataset_chunk(csv_path, start, end, node_encoder=None):
    """Load a chunk of dataset and convert to graphs."""
    df = pd.read_excel(csv_path)
    df = df.drop(columns=["commit_id", "project"])
    df = df.iloc[start:end].reset_index(drop=True)

    print("Generating ASTs and collecting node types...")
    ast_strings = []
    ast_lists = []
    # all_node_types = set()

    for code in tqdm(df['func']):
        try:
            # cleaned = wrap_c_code(clean_c_code(code))
            ast_string = generate_and_parse_ast_string(code)
            ast_strings.append(ast_string)

            # if ast_string.startswith("Error"):
            #     ast_list = []
            # else:
            #     ast_list = [line.strip().split()[0] for line in ast_string.strip().split("\n") if line.strip()]
            # ast_lists.append(ast_list)
            # all_node_types.update(ast_list)
        except Exception as e:
            ast_strings.append("Error")
            ast_lists.append([])

    df['AST'] = ast_strings
    df['AST_list'] = df['AST'].apply(lambda s: s.strip().split())
    # Initialize encoder if needed
    all_nodes = set(node for row in df['AST_list'] for node in row)
    # node_encoder = {node: idx for idx, node in enumerate(sorted(all_nodes))}
    # torch.save(node_encoder, "node_encoder.pt")
    graphs = []
    for ast, label in tqdm(zip(df['AST_list'], df['target']), total=len(df)):
        if ast:
            data = parse_ast_to_graph(ast, label, node_encoder)
            graphs.append(data)

    return graphs, node_encoder

class GNN(torch.nn.Module):
    """Graph Neural Network using SAGEConv."""
    def __init__(self, input_dim, output_dim, dropout=0.3):
        super(GNN, self).__init__()
        self.conv1 = SAGEConv(input_dim, 256)
        self.conv2 = SAGEConv(256, 128)
        self.conv3 = SAGEConv(128, 64)
        self.lin = torch.nn.Linear(64, output_dim)
        self.dropout = dropout

    def forward(self, data):
        x, edge_index, batch = data.x, data.edge_index, data.batch

        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = F.dropout(x, p=self.dropout, training=self.training)

        x = self.conv2(x, edge_index)
        x = F.relu(x)
        x = F.dropout(x, p=self.dropout, training=self.training)

        x = self.conv3(x, edge_index)
        x = F.relu(x)
        x = global_mean_pool(x, batch)

        return F.log_softmax(self.lin(x), dim=1)


