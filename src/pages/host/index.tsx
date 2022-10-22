import { useCallback, useEffect, useRef } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { P } from 'src/components/markup'
import { Root } from 'styles/pages/host'

const Tag = styled.span`
  display: inline-block;
`

const Blagh = styled.a`
  display: inline-block;
`

export default function HostPage () {
  const swapThemeFonts = useCallback(originalTheme => {
    return {
      ...originalTheme,
      typeface: {
        accent: originalTheme.typeface.primary,
        accentFamily: originalTheme.typeface.primaryFamily,
        primary: originalTheme.typeface.accent,
        primaryFamily: originalTheme.typeface.accentFamily,
      },
    }
  }, [])

  const whisperRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const whisper = whisperRef.current

    if (whisper) {
      window.addEventListener('scroll', () => {
        console.log(whisper.getBoundingClientRect())
        whisper.style.transform = `translateY(${ window.scrollY * 0.5 }px)`
      })
    }
  })

  return (
    <ThemeProvider theme={ swapThemeFonts }>
      <Root>
        <P>
          Mr. John Ziegler, thirty-seven, late of Louisville’s WHAS, is now on the air,
          “Live and Local,” from 10:00 pm to 1:00 am every weeknight on Southern
          California’s KFI, a 50,000-watt megastation whose hourly ID and sweeper,
          designed by the station’s Imaging department and featuring a gravelly
          basso whisper against licks from Ratt’s ’84 metal classic “Round and Round,” is: “KFI
          AM-640, Los Angeles—More Stimulating Talk Radio.” This is either the eighth or
          ninth host job that Mr. Ziegler’s had in his talk radio career, and far and away
          the biggest. He moved out here to LA over Christmas—alone, towing a U-Haul—and
          found an apartment not far from KFI’s studios, which are in an old part of the
          Koreatown district, near Wilshire Center.
        </P>
        <P>
          <em>The John Ziegler Show</em> is the first local, nonsyndicated late-night
          program that KFI has aired in a long time. It’s something of a gamble for
          everyone involved. 10:00–1:00 qualifies as late at night in Southern California,
          where hardly anything reputable’s open after nine.
        </P>
        <P>
          It is currently right near the end of the program’s second segment on the
          evening of May 11, 2004, shortly after Nicholas Berg’s taped beheading by an
          al-Qaeda splinter in Iraq. Dressed, as is his custom, for golf, and wearing a
          white billed cap w/ corporate logo, Mr. Ziegler is seated by himself in the
          on-air studio, surrounded by monitors and sheaves of Internet printouts. He is
          trim, clean-shaven, and <Blagh>handsome in the bland way</Blagh> that top golfers and local TV
          newsmen tend to be. His eyes, which off-air are usually flat and unhappy, are
          alight now with passionate conviction. Only some of the studio’s monitors
          concern Mr. Z.’s own program; the ones up near the ceiling take muted,
          closed-caption feeds from Fox News, MSNBC, and what might be C-SPAN. To his big
          desk’s upper left is a wall-mounted digital clock that counts down seconds. His
          computer monitors’ displays also show the exact time.
        </P>
      </Root>
    </ThemeProvider>
  )
}
