/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import Plyr from 'plyr'
import 'plyr/src/sass/plyr.scss'
import Hls from 'hls.js'
import logo from '@/assets/images/logo-bg.png'

interface Props {
  streamSession: StreamSession | null
}

const generateM3u8Object = (streamSession: StreamSession) =>
  [
    '#EXTM3U',
    '#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=2800000,CODECS="mp4a.40.2,avc1.64001f",FRAME-RATE:30,RESOLUTION=1920x1080,NAME="1080"',
    streamSession.streamUrlSource,
    // 'https://liveproduseast.global.ssl.fastly.net/btv/desktop/us_live.m3u8',
    // '#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=1300000,CODECS="mp4a.40.2,avc1.64001f",RESOLUTION=1280x720,NAME="720"',
    // streamSession.streamUrl720P,
    '#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=650000,CODECS="mp4a.40.2,avc1.64001f",RESOLUTION=854x480,NAME="480"',
    streamSession.streamUrl480P,
  ].join('\n')

const StreamPlayer = ({ streamSession }: Props) => {
  let hls: Hls | null = null

  const setUpPlayer = useCallback(() => {
    // default load
    const video = document.getElementById('#playerHls')
    const player = new Plyr(video as HTMLElement, {
      autoplay: true,
      controls: ['play', 'mute', 'volume', 'settings', 'pip', 'fullscreen'],
      ratio: '16:9',
      settings: ['quality'],
      quality: {
        default: 1080,
        options: [1080, 480, 0],
        forced: true,
        onChange: (quality: number) => {
          if (quality === 0) {
            hls.nextLevel = -1
            return
          }
          hls.levels.forEach((level, levelIndex) => {
            if (parseInt(level.name) === quality) {
              hls.nextLevel = levelIndex
            }
          })
        },
      },
    })

    setTimeout(() => {
      hls.startLoad()
      player.play()
      player.quality = 0
    }, 500)
  }, [])

  useEffect(() => {
    if (streamSession != null) {
      var enc = new TextEncoder()
      const video = document.getElementById('#playerHls')
      if (!Hls.isSupported()) {
        ;(video as any).muted = true
        ;(video as any).src = streamSession.streamUrlSource
        ;(video as any).play()
      } else {
        hls = new Hls({
          autoStartLoad: false,
        })

        hls.attachMedia(video as HTMLMediaElement)
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
          hls.loadSource(
            URL.createObjectURL(
              new Blob([enc.encode(generateM3u8Object(streamSession))]),
            ),
          )
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            setUpPlayer()
          })
          // Try to recover if error
          hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  // Try to recover network error
                  hls.startLoad()
                  break
                case Hls.ErrorTypes.MEDIA_ERROR:
                  hls.recoverMediaError()
                  break
                default:
                  // Cannot recover
                  hls.destroy()
                  break
              }
            }
          })
        })
      }
    }
  }, [])

  return (
    <Box w="full" h="auto">
      <video
        id="#playerHls"
        controls
        crossOrigin="use-credentials"
        playsInline
        poster={logo}
      ></video>
    </Box>
  )
}

export default React.memo(StreamPlayer)
