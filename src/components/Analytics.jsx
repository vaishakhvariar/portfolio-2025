import { useEffect } from 'react'

const GA_TRACKING_ID = 'G-XXXXXXXXXX' // Replace with your Google Analytics tracking ID

const Analytics = () => {
  useEffect(() => {
    // Load Google Analytics
    loadGoogleAnalytics()

    // Track page views
    trackPageView()

    // Add scroll tracking
    addScrollTracking()

    // Add click tracking for important elements
    addClickTracking()
  }, [])

  const loadGoogleAnalytics = () => {
    // Google Analytics 4 setup
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
    })

    // Make gtag available globally
    window.gtag = gtag
  }

  const trackPageView = () => {
    const trackPage = () => {
      window.gtag?.('event', 'page_view', {
        page_path: window.location.pathname,
        page_title: document.title,
      })
    }

    // Track initial page load
    trackPage()

    // Track route changes (if using a router)
    const handleRouteChange = () => {
      trackPage()
    }

    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }

  const addScrollTracking = () => {
    let lastScrollPercentage = 0
    const scrollThresholds = [25, 50, 75, 90]

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      const scrollPercentage = Math.round((scrollPosition / scrollHeight) * 100)

      scrollThresholds.forEach(threshold => {
        if (scrollPercentage >= threshold && lastScrollPercentage < threshold) {
          window.gtag?.('event', 'scroll_milestone', {
            percentage: threshold,
            page: window.location.pathname,
          })
        }
      })

      lastScrollPercentage = scrollPercentage
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }

  const addClickTracking = () => {
    const handleClick = (event) => {
      // Track clicks on important elements
      const trackableElements = {
        'a[href^="http"]': 'external_link',
        'a[href^="#"]': 'navigation_link',
        'a[href$=".pdf"]': 'download_cv',
        '.project-card': 'project_view',
        '.contact-button': 'contact_click',
      }

      for (const [selector, eventName] of Object.entries(trackableElements)) {
        if (event.target.matches(selector)) {
          window.gtag?.('event', eventName, {
            element: event.target.textContent,
            url: event.target.href || '',
            page: window.location.pathname,
          })
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }

  // Custom event tracking function that can be exported
  const trackEvent = (eventName, eventParams = {}) => {
    window.gtag?.('event', eventName, {
      ...eventParams,
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
    })
  }

  return null // This component doesn't render anything
}

// Export the trackEvent function for use in other components
export const trackEvent = (eventName, eventParams = {}) => {
  window.gtag?.('event', eventName, {
    ...eventParams,
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
  })
}

export default Analytics 