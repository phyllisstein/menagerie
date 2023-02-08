import { useCallback, useEffect, useRef } from 'react'
import { ThemeProvider } from 'styled-components'

import { P, SC } from 'src/components/markup'
import { Anchor, ContentPane, Root } from 'styles/pages/host'

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

  return (
    <ThemeProvider theme={ swapThemeFonts }>
      <Root onScroll={ () => console.log('scroll') }>
        <ContentPane>
          <P>
            Mr. John Ziegler, thirty-seven, late of Louisville’s <SC>WHAS</SC>, is now on the air,
            “Live and Local,” from 10:00 pm to 1:00 am every weeknight on Southern
            California’s <SC>KFI</SC>, a 50,000-watt megastation whose hourly <SC>ID</SC> and sweeper,
            designed by the station’s Imaging department and featuring a gravelly
            basso <Anchor ref={ whisperRef }>whisper</Anchor> against licks from Ratt’s ’84 metal classic “Round and Round,” is:
            “<SC>KFI</SC> <SC>AM</SC>-640, Los Angeles—More Stimulating Talk Radio.” This is either the eighth or
            ninth host job that Mr. Ziegler’s had in his talk radio career, and far and away
            the biggest. He moved out here to LA over Christmas—alone, towing a U-Haul—and
            found an apartment not far from <SC>KFI</SC>’s studios, which are in an old part of the
            Koreatown district, near Wilshire Center.
          </P>
          <P>
            <em>The John Ziegler Show</em> is the first local, nonsyndicated late-night
            program that <SC>KFI</SC> has aired in a long time. It’s something of a gamble for
            everyone involved. 10:00–1:00 qualifies as late at night in Southern California,
            where hardly anything reputable’s open after nine.
          </P>
          <P>
            It is currently right near the end of the program’s second segment on the
            evening of May 11, 2004, shortly after Nicholas Berg’s taped beheading by an
            al-Qaeda splinter in Iraq. Dressed, as is his custom, for golf, and wearing a
            white billed cap w/ corporate logo, Mr. Ziegler is seated by himself in the
            on-air studio, surrounded by monitors and sheaves of Internet printouts. He is
            trim, clean-shaven, and handsome in the bland way that top golfers and
            local <SC>TV</SC> newsmen tend to be. His eyes, which off-air are usually flat and unhappy, are
            alight now with passionate conviction. Only some of the studio’s monitors
            concern Mr. Z.’s own program; the ones up near the ceiling take muted,
            closed-caption feeds from Fox News, <SC>MSNBC</SC>, and what might be <SC>C-SPAN</SC>. To his big
            desk’s upper left is a wall-mounted digital clock that counts down seconds. His
            computer monitors’ displays also show the exact time.
          </P>
          <P>
            Across the soundproof glass of the opposite wall, another monitor in the Airmix
            room is running an episode of <em>The Simpsons</em>, also muted, which both the
            board op and call screener are watching with half an eye.
          </P>
          <P>
            Pendent in front of John Ziegler’s face, attached to the same type of hinged,
            flexible stand as certain student desk lamps, is a Shure-brand broadcast
            microphone that is sheathed in a gray foam filtration sock to soften popped p’s
            and hissed sibilants. It is into this microphone that the host speaks:
          </P>
          <P>
            “And I’ll tell you why—it’s because we’re <em>better</em> than they are.”
          </P>
        </ContentPane>
      </Root>
    </ThemeProvider>
  )
}
