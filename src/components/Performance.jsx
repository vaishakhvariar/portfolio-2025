import { useEffect } from 'react'
import { trackEvent } from './Analytics'

const Performance = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    monitorWebVitals()
    
    // Monitor Resource Loading
    monitorResources()
    
    // Monitor User Interactions
    monitorInteractions()
  }, [])

  const monitorWebVitals = () => {
    if ('web-vital' in window) {
      window.webVitals.getCLS((metric) => {
        trackEvent('web_vitals', {
          metric_name: 'CLS',
          value: metric.value,
        })
      })

      window.webVitals.getFID((metric) => {
        trackEvent('web_vitals', {
          metric_name: 'FID',
          value: metric.value,
        })
      })

      window.webVitals.getLCP((metric) => {
        trackEvent('web_vitals', {
          metric_name: 'LCP',
          value: metric.value,
        })
      })
    }
  }

  const monitorResources = () => {
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.initiatorType === 'img' || entry.initiatorType === 'script') {
            trackEvent('resource_timing', {
              resource_type: entry.initiatorType,
              resource_name: entry.name,
              duration: entry.duration,
              size: entry.transferSize,
            })
          }
        })
      })

      resourceObserver.observe({ entryTypes: ['resource'] })
    }
  }

  const monitorInteractions = () => {
    let lastInteractionTime = performance.now()

    const trackInteraction = (event) => {
      const currentTime = performance.now()
      const timeSinceLastInteraction = currentTime - lastInteractionTime

      trackEvent('user_interaction', {
        event_type: event.type,
        target: event.target.tagName,
        time_since_last: timeSinceLastInteraction,
      })

      lastInteractionTime = currentTime
    }

    ['click', 'scroll', 'keypress'].forEach((eventType) => {
      document.addEventListener(eventType, trackInteraction, { passive: true })
    })

    return () => {
      ['click', 'scroll', 'keypress'].forEach((eventType) => {
        document.removeEventListener(eventType, trackInteraction)
      })
    }
  }

  return null // This component doesn't render anything
}

export default Performance 