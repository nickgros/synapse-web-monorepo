import * as React from 'react'
import HeaderCard from './HeaderCard'
import { CardFooter, Icon } from './row_renderers/utils'
import { InternalLinkConfiguration } from './CardContainerLogic'

export type KeyToAlias = {
  key: string
  alias?: string
}

export type KeyToAliasMap = {
  [index: number]: KeyToAlias
  [index: string]: KeyToAlias
}

export type GenericCardSchema = {
  type: string
  title: string
  subTitle?: string
  description?: string
  icon?: string
  secondaryLabels?: KeyToAliasMap
  link?: string
}

export type IconOptions = {
  [index: string]: string
}
export type GenericCardProps = {
  iconOptions?: IconOptions
  backgroundColor?: string
  isHeader?: boolean
  genericCardSchema: GenericCardSchema,
  schema: any,
  data: any
  secondaryLabelLimit?: number
  internalLinkConfiguration?: InternalLinkConfiguration
}

export type GenericCardState = {
  showMoreDescription: boolean
}

const CHAR_COUNT_CUTOFF = 400
export const CARD_SHORT_DESCRIPTION_CSS = 'SRC-short-description'
export const CARD_LONG_DESCRIPTION_CSS = 'SRC-long-description'

// doi regex here - https://www.crossref.org/blog/dois-and-matching-regular-expressions/
// note - had to add an escape character for the second slash in the regex above
export const DOI_REGEX = /^10.\d{4,9}\/[-._;()/:a-z0-9]+$/
// check for 'syn' followed and ended by a digit of unlimited length
export const SYNAPSE_REGX = /syn\d+$/

export default class GenericCard extends React.Component<GenericCardProps, GenericCardState> {

  constructor(props: GenericCardProps) {
    super(props)
    this.state = {
      showMoreDescription: false
    }
  }

  public getLink (link: string, internalLinkConfiguration?: InternalLinkConfiguration, data?: string [], schema?: any) {
    let linkDisplay = link
    let target = '_self'
    if (link.match(SYNAPSE_REGX)) {
      // its a synId
      linkDisplay = `https://www.synapse.org/#!Synapse:${link}`
    } else if (link.match(DOI_REGEX)) {
      target = '_blank'
      linkDisplay = `https://dx.doi.org/${link}`
    } else if (!internalLinkConfiguration) {
      target = '_blank'
    } else if (internalLinkConfiguration) {
      if (!data || !schema) {
        throw Error('Must specify internalLinkConfiguration and data for linking to work')
      }
      const columnValuesLength = internalLinkConfiguration.columnValues.length
      const urlParams = internalLinkConfiguration.columnValues.map(
        (el, index) => {
          if (!schema.hasOwnProperty(el)) {
            console.error(`Could not find match for data: ${data} with columnName ${el}`)
          }
          const stringEnd = index < columnValuesLength - 1 ? '&' : ''
          return `${el}=${data[schema[el]]}${stringEnd}`
        }
      ).join('')
      // tested this link on the browser, there's no need to encode the URL, the browser picks up on that automatically
      linkDisplay = `#/${internalLinkConfiguration.baseURL}?${urlParams}`
    }
    return { linkDisplay, target }
  }

  getCutoff = (summary: string ) => {
    let previewText = ''
    const summarySplit = summary!.split(' ')
    // find num words to join such that its >= char_count_cutoff
    let i = 0
    while (previewText.length < CHAR_COUNT_CUTOFF && i < summarySplit.length) {
      previewText += `${summarySplit[i]} `
      i += 1
    }
    previewText = previewText.trim()
    return { previewText }
  }

  toggleShowMore = () => {
    this.setState({
      showMoreDescription: true
    })
  }

  render() {
    const {
      schema,
      data,
      genericCardSchema,
      secondaryLabelLimit,
      backgroundColor,
      iconOptions,
      isHeader = false,
      internalLinkConfiguration
    } = this.props
    const { showMoreDescription } = this.state
    const { link = '' } = genericCardSchema
    const type = genericCardSchema.type
    const title = data[schema[genericCardSchema.title]]
    const subTitle = genericCardSchema.subTitle && data[schema[genericCardSchema.subTitle]]
    const description = data[schema[genericCardSchema.description || '']]
    const iconValue = data[schema[genericCardSchema.icon || '']]
    // wrap link in parens because undefined would throw an error
    const linkValue: string = data[schema[link]] || ''
    const { linkDisplay, target } = this.getLink(linkValue, internalLinkConfiguration, data, schema)
    const values: string [][] = []
    if (genericCardSchema.secondaryLabels) {
      for (let i = 0; i < Object.keys(genericCardSchema.secondaryLabels).length; i += 1) {
        if (!genericCardSchema.secondaryLabels[i]) {
          throw Error(`Keys in genericCardSchema.secondaryLabels must be sequential, missing key: ${i}`)
        }
        const { key, alias = '' } =  genericCardSchema.secondaryLabels[i]
        const displayValue = alias ? alias : key
        const keyValue = [displayValue, data[schema[key]]]
        if (data[schema[key]]) {
          values.push(keyValue)
        }
      }
    }

    const showFooter = genericCardSchema.secondaryLabels && values.length > 0

    const style: React.CSSProperties = {
      background: backgroundColor,
      // undefined, take default value from class
      marginTop: isHeader ? '0px' : undefined,
      marginBottom: isHeader ? '0px' : undefined,
      paddingBottom: showFooter ? undefined : '15px'
    }

    if (isHeader) {
      return (
        <HeaderCard
          type={type}
          title={title}
          subTitle={subTitle}
          backgroundColor={backgroundColor}
          description={description}
          iconValue={iconValue}
          iconOptions={iconOptions}
          values={values}
          secondaryLabelLimit={secondaryLabelLimit}
        />
      )
    }
    return (
      <div
        style={style}
        className={'SRC-portalCard'}
      >
        <div className="SRC-cardThumbnail">
          <Icon iconOptions={iconOptions} value={iconValue} type={type} />
        </div>
        <div className="SRC-cardContent">
          <div className="SRC-type">{type}</div>
          <div >
            <h3 className="SRC-boldText SRC-blackText" style={{ margin: 'none' }}>
              {linkDisplay ?
                <a data-search-handle={genericCardSchema.title.toLowerCase()} className="SRC-primary-text-color" target={target} href={linkDisplay}>
                  {title}
                </a>
                :
                <span data-search-handle={genericCardSchema.title.toLowerCase()}> {title} </span>
              }
            </h3>
          </div>
          {subTitle && <div data-search-handle={genericCardSchema.subTitle!.toLowerCase()} className="SRC-author"> {subTitle} </div>}
          {/* 
            Below is a hack that allows word highlighting to work, the Search componenet insert's
            html elements outside of the React DOM which if detected would break the app,
            but as written below this avoids that reconcilliation process.
          */}
          {
            description &&
            <div data-search-handle={genericCardSchema.description!.toLowerCase()} className={showMoreDescription ? 'SRC-hidden' : ''}>
              <span className={`SRC-font-size-base ${CARD_SHORT_DESCRIPTION_CSS} SRC-short-description`}>
                {this.getCutoff(description).previewText}
              </span>
              {
                description.length >= CHAR_COUNT_CUTOFF
                &&
                <a
                  style={{ fontSize: '14px', cursor: 'pointer', marginLeft: '3px' }}
                  className="SRC-primary-text-color"
                  onClick={this.toggleShowMore}
                >
                  ...Show More{' '}
                </a>
              }
            </div>
          }
          {
            description &&
            <div data-search-handle={genericCardSchema.description!.toLowerCase()} className={showMoreDescription ? '' : 'SRC-hidden'}>
              <span className={`SRC-font-size-base ${CARD_LONG_DESCRIPTION_CSS}`}>
                {description}
              </span>
            </div>
          }
        </div>
        {showFooter && <CardFooter secondaryLabelLimit={secondaryLabelLimit} values={values}/>}
      </div>
    )
  }
}
