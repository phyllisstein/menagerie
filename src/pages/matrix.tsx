import { faHeartCrack } from '@fortawesome/sharp-solid-svg-icons/faHeartCrack'
import { ReactElement, useCallback, useState } from 'react'
import { useTheme } from 'styled-components'

import { DotPosition, EntryText } from 'components/matrix'
import { Scene, Stage, Transform } from 'components/stage'
import {
  Entry,
  Grid,
  Image,
  Label,
  LineX,
  LineY,
  Madge,
  PulsingIcon,
  Wrapper,
} from 'styles/pages/matrix'

export default function ApprovalMatrix (): ReactElement {
  const [step, setStep] = useState(1)

  const toggleCurrentStep = useCallback(
    (clickableStep: number) => {
      return () => {
        if (clickableStep === step) {
          setStep(1)
          return
        }

        setStep(clickableStep)
      }
    },
    [step],
  )

  const theme = useTheme()

  return (
    <Wrapper>
      <Stage step={ step }>
        <Scene layout>
          <Grid>
            <LineX />
            <LineY />
          </Grid>
        </Scene>
        <Scene layout>
          <Transform y={ -1440 } />
          <Label>Highbrow</Label>
        </Scene>
        <Scene layout>
          <Transform y={ 1440 } />
          <Transform rotate={ 180 } />
          <Label>Lowbrow</Label>
        </Scene>
        <Scene layout>
          <Transform x={ 1920 } />
          <Transform rotate={ 90 } />
          <Label>Brilliant</Label>
        </Scene>
        <Scene layout>
          <Transform x={ -1920 } />
          <Transform rotate={ -90 } />
          <Label>Despicable</Label>
        </Scene>
        <Scene>
          <Transform scale={ 4 } />
        </Scene>
        <Scene onClick={ toggleCurrentStep(2) }>
          <Transform x={ -512 } />
          <Transform y={ -80 } />
          <Transform scale={ 2 } />
          <Entry dot={ DotPosition.Bottom }>
            <EntryText>
              <strong>Ponchos.</strong>
            </EntryText>
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(3) }>
          <Transform x={ -256 } />
          <Transform y={ -256 } />
          <Transform z={ 512 } />
          <Transform scale={ 1.25 } />
          <Entry dot={ DotPosition.Left }>
            <EntryText style={{ marginRight: '-7rem' }}>
              <strong>Madonna</strong>, Oxford student.
            </EntryText>
            <Image
              src='/assets/matrix/madge.png'
              style={{ clipPath: `url('#madge_svg__madge')` }} />
            <Madge />
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(4) }>
          <Transform x={ -256 } />
          <Transform y={ -700 } />
          <Transform scale={ 1.5 } />
          <Entry dot={ DotPosition.TopRight } style={{ minWidth: 256 }}>
            <EntryText>
              <strong>PBS Broadway-musical documentary:</strong> Noble but
              misbegotten—and too many of the talking heads are dead.
            </EntryText>
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(5) }>
          <Transform x={ -1024 } />
          <Transform y={ -512 } />
          <Entry dot={ DotPosition.BottomRight }>
            <EntryText>
              <strong>
                <em>Tipping Point</em> author Malcolm Gladwell's
              </strong>{ ' ' }
              hair ignites: Geek schadenfreude erupts.
            </EntryText>
            <Image src='/assets/matrix/MalcolmGladwell.png' />
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(6) }>
          <Transform x={ -960 } />
          <Transform y={ -128 } />
          <Transform z={ 512 } />
          <Transform scale={ 2 } />
          <Entry dot={ DotPosition.TopLeft }>
            <EntryText>
              <strong>Tucker Carlson:</strong> His smugness boomerangs.
            </EntryText>
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(7) }>
          <Transform x={ -128 } />
          <Transform y={ -1100 } />
          <Transform scale={ 2 } />
          <Entry dot={ DotPosition.Top }>
            <EntryText>
              <strong>MoMA</strong> charges $20.
            </EntryText>
            <Image src='/assets/matrix/twenty.jpg' />
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(8) }>
          <Transform y={ -512 } />
          <Transform x={ 128 } />
          <Transform z={ -512 } />
          <Transform scale={ 1.5 } />
          <Entry dot={ DotPosition.Top }>
            <EntryText>
              <strong>Bob Dylan</strong> bio. Poignant! Idiosyncratic! And full
              of New York trivia.
            </EntryText>
            <Image src='/assets/matrix/dylan.jpg' />
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(9) }>
          <Transform y={ 512 } />
          <Transform x={ -1200 } />
          <Transform z={ 128 } />
          <Transform scale={ 1.5 } />
          <Transform rotateY={ 35 } />
          <Transform rotateX={ 10 } />
          <Transform rotateZ={ 5 } />
          <Entry dot={ DotPosition.BottomLeft }>
            <EntryText>
              <strong>Quickie marriages.</strong>
            </EntryText>
            <Image src='/assets/matrix/trucker.png' />
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(10) }>
          <Transform y={ 512 } />
          <Transform x={ -512 } />
          <Transform scale={ 2 } />
          <Entry dot={ DotPosition.TopRight }>
            <EntryText>
              <strong>Surviving Christmas:</strong> a Yuletide <em>Gigli</em>?
            </EntryText>
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(11) }>
          <Transform y={ 256 } />
          <Transform x={ 128 } />
          <Transform z={ 512 } />
          <Entry dot={ DotPosition.Top }>
            <EntryText>
              <strong>Halloween Parade:</strong> People think it's gross and
              tacky. (It's still fun.)
            </EntryText>
            <Image
              src='/assets/matrix/ghostling.png'
              style={{ maxHeight: 256 }} />
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(12) }>
          <Transform y={ 768 } />
          <Transform x={ 512 } />
          <Transform rotateY={ -45 } />
          <Transform scale={ 2 } />
          <Entry dot={ DotPosition.BottomLeft }>
            <EntryText>
              <strong>Grand Theft Auto: San Andreas.</strong> Vroom.
            </EntryText>
            <Image src='/assets/matrix/gtasa.jpg' />
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(13) }>
          <Transform x={ -960 } />
          <Transform y={ -960 } />
          <Transform scale={ 1.5 } />
          <Entry
            dot={ DotPosition.Top }
            style={{
              minWidth: 256,
            }}>
            <EntryText>
              <strong>It's All About Love:</strong> Dogma + indie star power =
              pretentious glop.
            </EntryText>
            <PulsingIcon
              icon={ faHeartCrack }
              size='3x'
              style={{ color: theme.palette.js.red400.alpha(0.8).css() }} />
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(14) }>
          <Transform x={ 1024 } />
          <Transform y={ -1024 } />
          <Transform z={ 256 } />
          <Transform scale={ 2 } />
          <Entry dot={ DotPosition.Right }>
            <EntryText>
              <strong>His Excellency: George Washington</strong>, by{ ' ' }
              <em>Founding Brothers</em> author Joseph J. Ellis.
            </EntryText>
            <Image src='/assets/matrix/washington.jpg' />
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(15) }>
          <Transform x={ 1024 } />
          <Transform y={ -360 } />
          <Entry dot={ DotPosition.BottomRight }>
            <EntryText>
              <strong>Ghery</strong> picked for WTC performing-arts center.
            </EntryText>
            <Image src='/assets/matrix/ghery.png' />
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(16) }>
          <Transform x={ 1440 } />
          <Transform y={ 1024 } />
          <Transform z={ -128 } />
          <Transform scale={ 1.5 } />
          <Entry dot={ DotPosition.TopLeft }>
            <EntryText>
              <strong>
                <em>Desperate Housewives:</em>
              </strong>{ ' ' }
              <em>Melrose</em>-like genius, plus a career boost for Felicity
              Huffman.
            </EntryText>
            <Image src='/assets/matrix/housewives.png' />
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(17) }>
          <Transform x={ 1440 } />
          <Transform y={ 384 } />
          <Transform z={ 128 } />
          <Entry dot={ DotPosition.Top }>
            <EntryText>
              Jaime Hernandez's{ ' ' }
              <strong>
                <em>Locas: A Love & Rockets Book</em>
              </strong>
              .
            </EntryText>
            <Image src='/assets/matrix/locas.jpg' />
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(18) }>
          <Transform x={ -256 } />
          <Transform y={ 900 } />
          <Entry dot={ DotPosition.BottomRight }>
            <EntryText>
              <strong>Burt Reynolds</strong>
              as Boss Hogg in <em>Dukes of Hazzard</em> movie. Toupée makers,
              rejoice.
            </EntryText>
            <Image src='/assets/matrix/reynolds.png' />
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(19) }>
          <Transform y={ 1000 } />
          <Transform x={ -850 } />
          <Transform z={ 256 } />
          <Entry dot={ DotPosition.TopLeft }>
            <EntryText>
              <strong>Stolen Honor: Wounds That Never Heal:</strong>
              Sinclair flip-flops on anti-Kerry doc.
            </EntryText>
            <Image
              src='/assets/matrix/purple-heart.png'
              style={{ height: 'auto', width: 256 }} />
          </Entry>
        </Scene>
        <Scene onClick={ toggleCurrentStep(20) }>
          <Transform rotateY={ -35 } />
          <Transform x={ -1440 } />
          <Transform y={ -768 } />
          <Transform z={ 768 } />
          <Transform scale={ 2 } />
          <Entry dot={ DotPosition.BottomRight }>
            <EntryText>
              <strong>Vincent Gallo</strong>, strutting, mutton-chopped Rasputin
              of indie cinema.
            </EntryText>
            <Image src='/assets/matrix/gallo.png' />
          </Entry>
        </Scene>
      </Stage>
    </Wrapper>
  )
}
