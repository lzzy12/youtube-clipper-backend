const youtubedl = require('youtube-dl-exec')
const execa = require('execa')
const path = require('path')
const  { v4: uuidv4 } = require('uuid')

exports.clipperController = async (req, res) => {
    const url = req.body.url
    const startTime = req.body.startTime
    const duration = req.body.duration
    try{
        console.log('getting direct download link')
        const output = await youtubedl(url, {
            youtubeSkipDashManifest: true,
            getUrl: true,
        })
        console.log('got download link')
        const outs =  output.split('\n')
        try{
            console.log('processing with ffmpeg')
            const id = uuidv4()
            await execa.command(`ffmpeg -ss ${startTime} -i ${outs[0]} -ss ${startTime} -i ${outs[1]} -t ${duration} -map 0:v -map 1:a -c:v libx264 -c:a aac ./outputs/${id}.mkv`)
            console.log('processing done! sending file')
            res.sendFile(path.resolve(`./outputs/${id}.mkv`));
            
        } catch(e){
            console.log(e)
            res.status(500).json(e)
        }
    } catch(e) {
          res.status(500).json(e)
    }
}