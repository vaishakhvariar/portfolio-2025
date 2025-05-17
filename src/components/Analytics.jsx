import { useEffect } from 'react'

// Replace this with your actual GA4 Measurement ID
const GA_TRACKING_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

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

    // Add performance tracking
    addPerformanceTracking()
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
      send_page_view: true
    })

    // Make gtag available globally
    window.gtag = gtag
  }

  const trackPageView = () => {
    const trackPage = () => {
      window.gtag?.('event', 'page_view', {
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: document.title
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
            page_path: window.location.pathname
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
      const target = event.target.closest('a, button')
      if (!target) return

      const label = target.textContent?.trim() || 
                   target.getAttribute('aria-label') || 
                   target.getAttribute('title') ||
                   'Unnamed element'

      window.gtag?.('event', 'click', {
        element_type: target.tagName.toLowerCase(),
        element_text: label,
        element_class: target.className,
        page_path: window.location.pathname
      })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }

  const addPerformanceTracking = () => {
    if ('performance' in window) {
      // Track Core Web Vitals
      const reportWebVitals = ({ name, delta, id }) => {
        window.gtag?.('event', 'web_vitals', {
          metric_name: name,
          metric_value: Math.round(name === 'CLS' ? delta * 1000 : delta),
          metric_id: id,
        })
      }

      // Track page load performance
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0]
        const paint = performance.getEntriesByType('paint')
        
        window.gtag?.('event', 'page_performance', {
          dns_time: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
          connection_time: Math.round(navigation.connectEnd - navigation.connectStart),
          ttfb: Math.round(navigation.responseStart - navigation.requestStart),
          dom_load_time: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
          fcp: paint.find(p => p.name === 'first-contentful-paint')?.startTime
        })
      })
    }
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