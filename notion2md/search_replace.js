const fs = require('fs')
const _ = require("lodash")
const path = require('path')


// Search all links and decode them
const search_decode_link = (data_str) => {
    
    // https://stackoverflow.com/questions/37462126/regex-match-markdown-link
    const reg_cond = /(?:__|[*#])|\[(.*?)\]\(.*?\)/
    const reg = new RegExp(reg_cond ,"g");

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll#specifying_a_function_as_a_parameter
    let match_count = 0
    const replace_res = data_str.replaceAll(reg, (match) => {
        match_count++
        // console.log(match)
        return decodeURI(match)
    })
    if (match_count > 0) console.log("Matches found: ", match_count)
    return replace_res
}


// Get a list of md files under given dirPath
const getAllFiles = function(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)
  
    arrayOfFiles = arrayOfFiles || []
  
    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
      } else if (path.extname(file) === '.md') {
        // Full path
        // arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
        // Relative path
        arrayOfFiles.push(path.join(dirPath, "/", file))
      }
    })
  
    return arrayOfFiles
}


const fix_all_md_link = (dir_path, in_options) => {
    // Fill default option
    options = _.defaultsDeep(in_options, {
        dry_run: false
    })
    console.log(options)

    // Get list of all md files in a dir, then fix the links
    const file_list = getAllFiles(dir_path)
    file_list.forEach((filename)=>{
        console.log(`Processing file: ${filename}`)
        const data = fs.readFileSync(filename, 'utf8')
        const replace_res = search_decode_link(data)
        if (!options.dry_run) {
            fs.writeFileSync(filename, replace_res, 'utf8')
            console.log("Finished editing file.")
            console.log("")
        }
    })
    console.log(`Total ${file_list.length} md files are processed.`)
}


fix_all_md_link('./my_pages')
