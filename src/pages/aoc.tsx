import Image from 'next/image'
import { ReactElement } from 'react'
import {
  BodyP,
  Container,
  Content,
  MarginP,
  Sidebar,
} from 'src/styles/pages/aoc'

import { Gloss, Margin } from 'components/gloss'

export default function AOC (): ReactElement {
  return (
    <Container>
      <Content>
        <BodyP>
          Ocasio-Cortez, like so many other people of color in her generation,
          had been seduced by the promise that higher education would open up
          opportunities.
        </BodyP>
        <BodyP>
          But life out of college was a shock, as it was for millions of other
          millennials entering the postrecession job market. Her father, Sergio,
          who had died when she was a sophomore at Boston University, had told
          her she was special, destined for greatness, capable through
          intelligence and grit of attaining her dreams, and her education had
          reinforced that notion. But upon graduating in 2011, she saw that it
          didn’t matter how smart she was, what she knew, how ambitious or
          imaginative her ideas were. It didn’t matter that she’d won science
          prizes; been chosen to give speeches; immersed herself in economics,
          music, and literature; and graduated cum laude. Sandy, as she was
          sometimes known back then, was a petite young Puerto Rican woman with
          bills to pay. She moved into an apartment in the Parkchester
          development in the Bronx that had belonged to her father, with $25,000
          in student loans and no health insurance. Up in Yorktown Heights in
          Westchester, her family relied on food stamps.
        </BodyP>
        <Gloss>
          <BodyP>
            Throughout high school and college, she had attended the National
            Hispanic Institute, a youth leadership organization, and now she was
            given a paid fellowship there, helping the administrators develop
            high-school curricula, traveling the country to set up and lead
            summer programs, and receiving a grant to try to launch a series of
            children’s books with Latino characters. She wanted to share the
            pleasure of reading with young kids in the barrio, who, she thought,
            might more easily take to it if they saw themselves reflected in the
            books. But she wasn’t able to get the series off the ground. At
            around the same time, she rented space at a small-business incubator
            in the Bronx. People who knew her then remember her working on a
            tool to help educators track kids’ emotional and mental health. She
            took meetings and reached out through her networks, but that project
            was going nowhere as well, and she became extremely discouraged.
          </BodyP>
          <Margin>
            <img
              alt='Cover of a book'
              src='/assets/aoc/take-up-space-9781501166976_hr.jpg' />
            <MarginP>
              Adapted from <em>Take Up Space: The Unprecedented AOC</em>, a
              book-length, kaleidoscopic biography by the editors of{ ' ' }
              <em>New York</em> Magazine, with contributions by Andrea
              González-Ramírez, Lisa Miller, Michelle Ruiz, Rebecca Traister,
              David Wallace-Wells, and many others. Published by Simon &
              Schuster. Copyright 2022.
            </MarginP>
          </Margin>
        </Gloss>
        <BodyP>
          “Alex, I think, had a Mary Poppins understanding that you follow a
          particular pathway, and bingo! You’re successful,” says Ernesto Nieto,
          a co-founder of the NHI. When she foundered, she felt she was to
          blame. Facing the disparity between how she saw herself and how the
          world saw her “was not very pleasant,” Nieto adds. “That’s the journey
          for a lot of Latinos. The same doors are not there for us as for
          somebody else.”
        </BodyP>
        <BodyP>
          On long car rides to NHI events, Ocasio-Cortez and Nieto swapped
          stories of losing loved ones at a young age, of living between the
          city and the suburbs, of shouldering the responsibility of caring for
          family. Nieto tried to frame Ocasio-Cortez’s struggles as systemic,
          not owing to any shortcoming on her part. Only recent college
          graduates with family support could afford to gild their résumés with
          high-prestige, low-paying internships or to take the financial risk of
          starting a business. In the car, unburdening themselves to each other,
          Ocasio-Cortez and her mentor would cry.
        </BodyP>
        <BodyP>
          Life’s auspicious moments are often only evident in retrospect.
          Ocasio-Cortez was likely in the midst of something else when she heard
          from Gabriel. Was she interested in running for Congress? “I mean,
          it’s one of those things where it was like, ‘Eff it. Sure.
          Whatever,’ ” she has said.
        </BodyP>
        <BodyP>
          From his car, Gabriel filled out the web form and hit SEND.
        </BodyP>
        <Gloss left top={ 50 }>
          <BodyP>
            Exhausted, Ocasio-Cortez turned to waitressing, which was at least
            reliable. “Working with young people, as immensely fulfilling as it
            is, did not pay the bills,” she told Cornel West and Tricia Rose in
            2020. There was something liberating, finally, about abandoning the
            imagined, idealized path to a fantasy career in favor of meeting the
            pressing need. On a good night, she could earn hundreds of dollars —
            cash — which she would stash in a purse against future expenses. She
            worried about what her father would think of her life, whether he
            would be disappointed in her, but she also felt unshackled by
            admitting that this was what she needed to do for now. Whenever she
            tried to map her life in terms of achievements or goals, “I was
            deeply unhappy,” she has said. “And when I started focusing more on
            how I want to be, I was much happier, even when I was a waitress.”
          </BodyP>
          <Margin>
            <img
              alt='Bartending'
              src='/assets/aoc/9a5eadebe5b6c9cf4b5c69cae42c0745a2-220131-NYMAGE-HIRES-JOSEALVARADOJR-01.jpg' />
            <MarginP>AOC tending bar.</MarginP>
          </Margin>
        </Gloss>
      </Content>
      <Sidebar />
    </Container>
  )
}
