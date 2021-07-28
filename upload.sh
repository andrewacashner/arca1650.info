#!/usr/bin/env sh
#
# Upload www directory to public_html directory on server
#
# Only upload changed, recently modified files
# Delete extraneous files
rsync -avuzh --delete \
    -e "ssh -p 7822 -i $HOME/.ssh/id_rsa-a2" \
    ./www/ arcainfo@arca1650.info:~/public_html/


# For reference, this is how to do it with scp, but it lacks a lot of
# important features (deleting extraneous files, only updating changed files)
# scp -P 7822 -i ~/.ssh/id_rsa-a2 -r www/* arcainfo@arca1650.info:~/public_html
