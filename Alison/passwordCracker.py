import argparse

def argument_parser():
    parser = argparse.ArgumentParser(description='CrackUnix hashed passwords by generating a rainbow table')
    parser.add_argument("--repo", nargs="?",default = "./plaintext.txt", help="Location of the plain textpassword")
    parser.add_argument("--pass-file", nargs="?", default="./user_passwords.txt", help="Location of the user:password"
)   
    var_args = vars(parser.parser.parse_args())
    return var_args

def password_check(hased_pass):
    salt = hashed_pass[:2]
    with open(plaintext_pwords) as repo:
        for word in repo.readlines():
            word = word.strip("\n")
            digest = crypt.crypt(word,salt)
            if digest == hashed_pass:
                print("[+] Found password:{}\n".format(word))
                
def parse_file(usernames):
    with open(usernames) as pass_file:
        for line in pass_file.readlines():
            if ":" in line:
                usernames = line.split(":")[0]
                pass_digest = line.split(":")[1].strip(" ")
                print("[*] Cracking password for : {}".format(username))
                password_check(pass_digest)
                
if __name__ == "__main__":
    user_args = argument_parser()
    plaintext_pwords = user_args["repo"]
    digests = user_args["pass_file"]
    
    parse_file(digests)