import { canUseDOM } from 'exenv'
import pWaitFor from 'p-wait-for'
import { useEffect } from 'react'

export const useHyphenator = target => {
  useEffect(() => {
    const getHyphenator = async () => {
      if (!canUseDOM || !target || !target.innerHTML) {
        return await Promise.resolve()
      }

      await pWaitFor(() => !!window.Hyphenopoly?.hyphenators)
      const hyphenator = await window.Hyphenopoly.hyphenators.HTML
      hyphenator(target, '.__hyphenate')
    }

    void getHyphenator()
  }, [target])
}
