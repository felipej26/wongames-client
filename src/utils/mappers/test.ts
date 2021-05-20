import { QueryGames_games } from 'graphql/generated/QueryGames'
import {
  QueryHome_banners,
  QueryHome_sections_freeGames_highlight
} from 'graphql/generated/QueryHome'
import { bannerMapper, gamesMapper, highlightMapper } from '.'

describe('bannerMapper()', () => {
  it('should return the correct format when mapped', () => {
    const banner = {
      image: {
        url: '/image.jpg'
      },
      title: 'Banner title',
      subtitle: 'Banner subtitle',
      button: {
        label: 'button label',
        link: 'button link'
      },
      ribbon: {
        text: 'ribbon text',
        color: 'primary',
        size: 'small'
      }
    } as QueryHome_banners

    expect(bannerMapper([banner])).toStrictEqual([
      {
        img: 'http://localhost:1337/image.jpg',
        title: 'Banner title',
        subtitle: 'Banner subtitle',
        buttonLabel: 'button label',
        buttonLink: 'button link',
        ribbon: 'ribbon text',
        ribbonColor: 'primary',
        ribbonSize: 'small'
      }
    ])
  })

  it('should return the correct format when image is null', () => {
    const banner = {
      image: null,
      title: 'Banner title',
      subtitle: 'Banner subtitle',
      button: {
        label: 'button label',
        link: 'button link'
      },
      ribbon: {
        text: 'ribbon text',
        color: 'primary',
        size: 'small'
      }
    } as QueryHome_banners

    expect(bannerMapper([banner])).toStrictEqual([
      {
        img: 'http://localhost:1337',
        title: 'Banner title',
        subtitle: 'Banner subtitle',
        buttonLabel: 'button label',
        buttonLink: 'button link',
        ribbon: 'ribbon text',
        ribbonColor: 'primary',
        ribbonSize: 'small'
      }
    ])
  })
})

describe('gamesMapper()', () => {
  it('should return an empty array if there are no games', () => {
    expect(gamesMapper(null)).toStrictEqual([])
  })

  it('should return the correct format when mapped', () => {
    const game = {
      id: '1',
      name: 'game',
      developers: [{ name: 'developer' }],
      slug: 'game',
      cover: { url: '/image.jpg' },
      price: 10
    } as QueryGames_games

    expect(gamesMapper([game])).toStrictEqual([
      {
        id: '1',
        title: 'game',
        slug: 'game',
        developer: 'developer',
        img: 'http://localhost:1337/image.jpg',
        price: 10
      }
    ])
  })

  it('should return the correct format when image is null', () => {
    const game = {
      id: '1',
      name: 'game',
      developers: [{ name: 'developer' }],
      slug: 'game',
      cover: null,
      price: 10
    } as QueryGames_games

    expect(gamesMapper([game])).toStrictEqual([
      {
        id: '1',
        title: 'game',
        slug: 'game',
        developer: 'developer',
        img: 'http://localhost:1337',
        price: 10
      }
    ])
  })
})

describe('highlightMapper()', () => {
  it('should return an empty array if there are no highlights', () => {
    expect(highlightMapper(null)).toStrictEqual([])
  })

  it('should return the correct format when mapped', () => {
    const highlight = {
      title: 'title',
      subtitle: 'subtitle',
      background: { url: '/image.jpg' },
      floatImage: { url: '/floatImage.jpg' },
      buttonLabel: 'button label',
      buttonLink: 'button link',
      alignment: 'right'
    } as QueryHome_sections_freeGames_highlight

    expect(highlightMapper(highlight)).toStrictEqual({
      title: 'title',
      subtitle: 'subtitle',
      backgroundImage: 'http://localhost:1337/image.jpg',
      floatImage: 'http://localhost:1337/floatImage.jpg',
      buttonLabel: 'button label',
      buttonLink: 'button link',
      alignment: 'right'
    })
  })

  it('should return the correct format when images is null', () => {
    const highlight = {
      title: 'title',
      subtitle: 'subtitle',
      background: null,
      floatImage: null,
      buttonLabel: 'button label',
      buttonLink: 'button link',
      alignment: 'right'
    } as QueryHome_sections_freeGames_highlight

    expect(highlightMapper(highlight)).toStrictEqual({
      title: 'title',
      subtitle: 'subtitle',
      backgroundImage: 'http://localhost:1337',
      floatImage: 'http://localhost:1337',
      buttonLabel: 'button label',
      buttonLink: 'button link',
      alignment: 'right'
    })
  })
})
