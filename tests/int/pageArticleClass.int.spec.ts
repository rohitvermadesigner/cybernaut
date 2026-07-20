import { describe, expect, test } from 'vitest'

import { getPageArticleClassName } from '@/app/(frontend)/[slug]/pageArticleClass'

describe('getPageArticleClassName', () => {
  test('removes article spacing on the cctv support page', () => {
    expect(getPageArticleClassName('cctv-support')).toBeUndefined()
  })

  test('keeps article spacing on other pages', () => {
    expect(getPageArticleClassName('about-us')).toBe('pt-16 pb-24')
  })
})
