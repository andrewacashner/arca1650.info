#!/usr/bin/env sh
# Upload www directory to public_html directory on server
scp -P 7822 -i ~/.ssh/id_rsa-a2 -r www/* arcainfo@arca1650.info:~/public_html
