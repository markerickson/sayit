#!/usr/bin/env python

import sys
import datetime

from string import lower, strip

from fabric.api import *
from fabric.contrib.files import contains, exists, comment, uncomment, append, contains
from fabric.colors import green, blue, red, yellow


homedir = '/home/ec2-user'
env.user = 'ec2-user'


def deploy():
  codezip = 'sayit.zip'
  appfolder = 'app'

  # Put git-master onto the web-server host
  gitarchive(codezip)
  put(codezip)

  with cd(appfolder):
    with settings(warn_only=True):
      run('supervisorctl stop all')
      run('supervisorctl shutdown')

      # Sometimes node just doesn't quit, so kill 'em all
      run('killall node')
      run('mv node_modules /tmp')

  with settings(warn_only=True):
    run('rm -rf %s' % appfolder)
    run('unzip -o %s -d %s' % (codezip, appfolder))
    run('rm %s' % codezip)
    run('mv /tmp/node_modules %s' % appfolder)

  # Install new modules and start workers
  with cd(appfolder):
    run('npm prune')
    run('npm update')
    run('npm install')
    with settings(warn_only=True):
      run('mkdir -p /tmp/supervisord')
      run('supervisord -d /home/ec2-user/app')
      run('supervisorctl start all')

  # Clean up our local directory
  sudo('chmod 0755 /home/ec2-user')
  sudo('chmod 0755 /home/ec2-user/app')
  sudo('chmod -R 0755 /home/ec2-user/app/public')
  local('rm %s' % codezip)

  with cd(appfolder):
    run('supervisorctl maintail')



def installnode():
  nodeurl = 'http://nodejs.org/dist/v0.10.16/node-v0.10.16-linux-x64.tar.gz'
  nodezip = 'node-v0.10.16-linux-x64.tar.gz'
  nodefolder = 'node-v0.10.16-linux-x64'

  with settings(warn_only=True):
    run('mkdir node')
  with cd('node'):
    run('wget -N --no-parent %s' % nodeurl)
    run('tar xzvf %s -C ~/bin/' % nodezip)
  with cd('bin'):
    run('ln -fs %s/bin/node node' % nodefolder)
    run('ln -fs %s/bin/npm npm' % nodefolder)
    run('npm install -g forever')
    run('npm install -g node-gyp')
