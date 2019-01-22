import argparse
from sys import argv, exit
from datetime import datetime, tzinfo, timedelta
import pytz

def arg_parse():
    parser = argparse.ArgumentParser(\
        description = 'For generating title stamps for my blog posts',\
        epilog = 'Version: 0.0.1'\
    )

    parser.add_argument('-t', '-title', metavar = '', required = True, help = 'Set the title of the blog post')
    parser.add_argument('-a', '-tags', metavar = '', required = True, help = 'Enter tags associated with this post')

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
    for t in tags.split(','):
        s += f"'{t}',"
    s = s[:-1] # Remove last comma
    return s + ']'

def build_header(title, tags):
    str_list = ['---']
    str_list.append(to_path(title)) # Path
    str_list.append(datetime.now().isoformat() + 'Z')
    str_list.append('title: ' + f'"{title}"')
    str_list.append('excerpt:')
    str_list.append(generate_tags(tags))
    str_list.append('---')

    return '\n'.join(str_list)

def main():
    args = arg_parse()
    print(build_header(args.t, args.a))

if __name__ == "__main__":
    main()