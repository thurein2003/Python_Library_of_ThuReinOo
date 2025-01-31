import hashlib
import os

#hash is the value of the file
def hashFile(filename):
    BLOCKSIZE = 65536
    hasher = hashlib.md5()
    with open(filename, 'rb') as afile:
        buf = afile.read(BLOCKSIZE)
        while len(buf) > 0:
            hasher.update(buf)
            buf = afile.read(BLOCKSIZE)
    return hasher.hexdigest()

if __name__ == "__main__":
    hashMap = {}

    deleteFile = []
    filelist = [f for f in os.listdir() if os.path.isfile(f)]
    for f in filelist:
        key = hashFile(f)

        if key in hashMap.key():
            deleteFile.append(f)
            os.remove(f)
        else:
            hashMap[key] = f
    if len(deleteFile) != 0:
        print("Deleted Files are: ", deleteFile)
        for i in deleteFile:
            print(i)
    else:
        print("No Duplicate Files Found")