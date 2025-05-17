import { useEffect } from 'react'
import metadata from '../meta.json'

const SEO = ({ title, description, path = '' }) => {
  const fullTitle = title || metadata.title
  const fullDescription = description || metadata.description
  const url = `${metadata.siteUrl}${path}`

  useEffect(() => {
    // Update document title
    document.title = fullTitle

    // Update meta tags
    updateMetaTag('description', fullDescription)
    updateMetaTag('keywords', metadata.keywords)
    updateMetaTag('author', metadata.author)
    
    // Open Graph tags
    updateMetaTag('og:title', fullTitle)
    updateMetaTag('og:description', fullDescription)
    updateMetaTag('og:type', 'website')
    updateMetaTag('og:url', url)
    updateMetaTag('og:image', `${metadata.siteUrl}${metadata.ogImage}`)
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:creator', metadata.twitterHandle)
    updateMetaTag('twitter:title', fullTitle)
    updateMetaTag('twitter:description', fullDescription)
    updateMetaTag('twitter:image', `${metadata.siteUrl}${metadata.ogImage}`)
    
    // Theme color
    updateMetaTag('theme-color', metadata.themeColor)

    // Add JSON-LD structured data
    addStructuredData()
  }, [fullTitle, fullDescription, url])

  const updateMetaTag = (name, content) => {
    let element = document.querySelector(`meta[name="${name}"]`) ||
                 document.querySelector(`meta[property="${name}"]`)
    
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(name.startsWith('og:') ? 'property' : 'name', name)
      document.head.appendChild(element)
    }
    
    element.setAttribute('content', content)
  }

  const addStructuredData = () => {
    // Remove existing structured data
    const existingScript = document.querySelector('#structured-data')
    if (existingScript) {
      existingScript.remove()
    }

    // Create structured data script
    const script = document.createElement('script')
    script.setAttribute('id', 'structured-data')
    script.setAttribute('type', 'application/ld+json')
    
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: metadata.author,
      url: metadata.siteUrl,
      image: `${metadata.siteUrl}${metadata.ogImage}`,
      sameAs: [
        `https://twitter.com/${metadata.twitterHandle}`,
        // Add other social profile URLs here
      ],
      jobTitle: 'Full-Stack Developer',
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance'
      }
    }
    
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)
  }

  return null // This component doesn't render anything
}

export default SEO 