import argparse
from sys import argv, exit

def arg_parse():
    parser = argparse.ArgumentParser(\
        description = 'For generating title stamps for my blog posts',\
        epilog = 'Version: 0.0.1'\
    )

    parser.add_argument('-t', '-title', type = string, metavar = '', required = True, help = 'Set the title of the blog post')
    parser.add_argument('-a', '-tags', type = string, metavar = '', required = True, help = 'Enter tags associated with this post')

    args = parser.parse_args() # Parse the args

    if len(argv) == 1:
        parser.print_help() # User (me) forgot how to use this
        exit(1)
    return args

"""
" Removes spaces in given blog title and converts to path appripriate format
" :arg name: String
" :return: String
"""
def to_path(name):
    # Replace spaces with hyphens, lower case
    name = name.replace(' ', '-').lower()
    return 'path: "/' + name + '"'

"""
" Format tag strings
" :arg tags: string[]
" :return: string
"""
def generate_tags(tags):
    s = 'tags: ['
    for t in tags:
        s += f"'{t}',"
    s = s[:-1] # Remove last comma
    return s + ']'

def build_tag(title, tags):
    path = to_path(title)
    

def main():
    args = arg_parse()
    print(args.title)
    print(args.tags)

if __name__ == "__main__":
    main()