#  Bocchi the Rock Wallpaper
This is a web-based wallpaper inspired from the anime Bocchi the rock. This website features a music player and a playlist that allows users to browse the playlist
and create their own custom playlist.

##  Thumbnail
<img src="./assets/thumbnail_1.png" />

##  Other song & playlist
<img src="./assets/thumbnail_2.png" />

##  Steam Workshop Link:
[Bocchi the Rock! ぼっち・ざ・ろっく！(Album)](https://steamcommunity.com/sharedfiles/filedetails/?id=2905017768)

## To create your own custom playlist
You need to have Node/NPM to be installed in your system to be able to build the file into a static HTML file. Every song in the playlist is stored in the SongData.json, which is the file
that you'll need to edit for you to add custom songs. <br/>

##  SongData JSON structure

```json
{
    "id": 1,
    "name": "Guitar, Loneliness and Blue Planet", // Required. English (or romanized if not provided) title of the song, which is displayed in the player and playlist. Also specifies the filename for the music and singles cover.
    "nameOriginal": "ギターと孤独と蒼い惑星", // Optional. Used to specify the title in the original language. If null, assume the title is English-only and fallback to name.
    "nameRomanized": "Guitar to Kodoku to Aoi Hoshi", // Optional. Used to specify the romanized title. If null, assume there is no English title or title in original language and fallback to name.
    "audioType": ".mp3", // Optional. Used to specify an audio format. If null, fallback to .flac.
    "album": "", // Optional. Used to specify an album and the filename of the cover image. If null, fallback to name.
    "single": "", // Optional. Used to specify a single with multiple songs and the filename of the cover image. If null, fallback to album.
    "backgroundColor": "#4C2633", // Color of the background. Colors may be based from what YouTube provided.
    "lineColor": "rgba(237, 112 ,154 ,.9)", // Border color of the playlist.
  }
```
##  Built with
React JS - Front-End <br/>
localstorage - to store playlist data.
