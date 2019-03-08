
```bash
# detecting updates with npm
npm outdated

# install specific version of package
npm install --save package@1.0.0

# to find conflicts just run again
npm install

# detecting updates with ncu
ncu

# upgrade a specific package to latest major version
ncu -u package
npm install

# check package version
npm list package

# update all package dependencies in package.json but does not update json file
ncu -u
npm install

# update all package dependencies in package.json and update json file
ncu -a
npm install
```


