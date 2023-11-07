from zipfile import ZipFile
import argparse

parser = argparse.ArgumentParser(description="\nUsage: python zipbrute.py -z <zipfile.azip> -p <passwordfile.txt>")
parser.add_argument("-z", dest="ziparchive", help="Zip archive file")
parser.add_argument("-p", dest="passfile", help ="Password file")
parsed_args = parser.parse_args()

try:
    ziparchive = ZipFile(parsed_args.zipzrchive)
    passfile = parsed_args.passfile
    foundpass = ""
except:
    print(parser.description)
    exit(0)