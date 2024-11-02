#!/bin/bash

rsync -auv --exclude '.vscode' --exclude '*.git' --exclude '.gitignore' --exclude 'local.*.cmd' --exclude '*.xlsx' --exclude 'CNAME' --exclude 'publish.*' . ../../docs
