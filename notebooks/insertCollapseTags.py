import sys
import argparse
from bs4 import BeautifulSoup


def parse_input():
    """Parse the input from the command line."""
    parser = argparse.ArgumentParser(description='Convert ipynb html files so that the input field are collapsable.')
    parser.add_argument('html_file', type=argparse.FileType('r'), help='ipynb as html file to process.')
    parser.add_argument('to_collapse', type=int, nargs='*', help='Indices of input fields to collapse.')
    args = parser.parse_args()
    return args.html_file, args.to_collapse

def insert_collapse_buttons(soup, to_collapse):
    """Insert the collapse buttons on the code input field of the nb."""
    input_areas = soup.select('div.inner_cell > div.input_area')
    for idx, input_area in enumerate(input_areas):
        # Add the collapse/expand button
        collapse_expand_button_tag = soup.new_tag('div')
        collapse_expand_button_tag['class'] = 'collapse_expand_button fa fa-1x fa-minus-square-o'
        input_area.insert(0, collapse_expand_button_tag)
        # Collapse if needed
        if idx+1 in to_collapse:
            input_area['class'].append('collapsed')

def main():
    html_file, to_collapse = parse_input()
    soup = BeautifulSoup(html_file, 'html.parser')
    insert_collapse_buttons(soup, to_collapse)
    # Overwrite original file
    print(soup.prettify())
    html_file.close()

if __name__ == "__main__":
    main()
