import argparse
from sys import argv, exit
from datetime import datetime, tzinfo, timedelta
import pytz
import os
from os import path
from pathlib import Path

def arg_parse():
    parser = argparse.ArgumentParser(\
        description = 'For generating title stamps for my blog posts',\
        epilog = 'Version: 0.0.1'\
    )

    parser.add_argument('-t', '-title', metavar = '', required = True, help = 'Set the title of the blog post')
    parser.add_argument('-d', '-description', metavar = '', required = True, help = 'Enter description post')
    parser.add_argument('-a', '-tags', metavar = '', required = True, help = 'Enter tags associated with this post')
    parser.add_argument('-p', '-path', metavar = '', required = False, nargs = '?', default = '/src/pages/posts', help = 'Enter path to generate file, "." for current dir')

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
    return '"/' + name + '"'

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

def build_header(title, description, tags):
    str_list = ['---']
    str_list.append('path: ' + to_path(title)) # Path
    str_list.append('date: "' + datetime.now().isoformat()[:-3] + 'Z"')
    str_list.append('title: ' + f'"{title}"')
    str_list.append('description: ' + f'"{description}"')
    str_list.append('image: \'./blank.jpg\'')
    str_list.append(generate_tags(tags))
    str_list.append('---')

    return '\n'.join(str_list)

def main():
    args = arg_parse()

    # Create dir
    date_str = datetime.today().strftime('%Y-%#m-%#d') + '-'
    file_name = to_path(args.t).replace('/', '').replace('"', '')
    directory = date_str + file_name
    rel = str(Path(os.path.abspath(__file__)).parents[1])
    if not os.path.exists('/'.join([rel, args.p, directory])):
        os.makedirs('/'.join([rel, args.p, directory]))

    f = open('/'.join([rel, args.p, directory, 'index.md']), 'w+')
    f.write(build_header(args.t, args.d, args.a))
    f.close()

if __name__ == "__main__":
    main()