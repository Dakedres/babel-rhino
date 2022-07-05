// I used to the babel to create the babel

const babel = require('@babel/core'),
      fs = require('fs/promises'),
      path = require('path')

if(!process.argv[2]) {
  console.log('No package specified')
  process.exit(0)
}

const packageDir = path.join(__dirname, 'packages', process.argv[2]),
      inputDir = path.join(packageDir, 'src'),
      outputDir = path.join(packageDir, 'lib') 

const babelOptions = filename => ({
  filename,
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        },
        modules: 'commonjs'
      }
    ]
  ]
})

;(async () => {

  let files = await fs.readdir(inputDir, { withFileTypes: true }),
      initOut = false

  await fs.access(outputDir)
    .catch(() => initOut = true)

  if(initOut)
    fs.mkdir(outputDir)

  for(let file of files) {
    let nameParts = path.parse(file.name)

    if(!file.isFile() || nameParts.ext != '.ts')
      continue

    let filePath = path.join(inputDir, file.name),
        code = await fs.readFile(filePath, { encoding: 'utf-8' }),
        out = await babel.transformAsync(code, babelOptions(file.name) )
          .catch(err => console.error(`Could not compile "${file.name}"`, err) )

    await fs.writeFile(path.join(outputDir, nameParts.name + '.js'), out.code)
    console.log(`"${file.name}" compiled`)
  }

})()