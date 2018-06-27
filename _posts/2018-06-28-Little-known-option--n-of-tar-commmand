As many of us know, tar is used to pack ( without compression ) multiple file into single file. This makes it convenient to back-up or copy multiple files from one location to another.


Historically, tar is also used to take backup of set of files on tape drive, which earns this command a name tar ( Tape ARchive) . Tape drives provides sequential access, and unlike hard drives or cd-rom drives, are not random access device.  ( Do you remember rewinding an audio cassette :-) ! )  So, toreach on location N on tape, only fast-forward or rewind operation had to be used. Which makes tape drives only suitable for archival.  ( tapes are cheap )


Even today, tar is one of the popular format for archiving 


While GNU tar document says that tar command automatically detects that underlying storage is seekable or not, there is a chance that it fails to do so, probably if tar archive is not created by GNU tar itself, ( see this ) or tar archive is created with non-default block-number .


So, we had a situation where tar archive contains 10 files, approximately each of 4 GB of size followed by one small file which contains md5sum of each file. This tar was on NFS share, and when we tried extracting only the last file, named checksum.txt


`` tar -xvf  /nfs_share/archive.tar checksum.txt ``


This command was taking like 20-30 mins, because NFS share was busy serving other's request as well. This got our attention. After attaching strace to running tar, it became clear that it is indeed opening an archive from beginning to the end, and reading entire file till it encounters checksum.txt file. This was a sheer waste of a resource, because NFS share is seekable anyway. So, we opened up a GNU tar's man page. it says, use -n option to make tar assume that archive is seekable, we ran that command again,


`` tar -n -xvf  /nfs_share/archive.tar checksum.txt ``


This time it fails by saying that it could not find header where it supposed to find in file. This error leads us to a direction that somehow there is something regarding block factor that tar is not able to get. Unfortunately, tar archive does not contain any information about block factor, i.e. with which block factor the tar has been created. From the man page we found that default is 20, 
