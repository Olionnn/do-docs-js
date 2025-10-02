# Debugging dan Troubleshooting

## Overview
Debugging adalah skill penting dalam React Native development. Dengan tools yang tepat, Anda bisa mengidentifikasi dan memperbaiki issues dengan cepat.

## Metro Bundler Debugging

### Enable Debug Mode
```bash
# Start Metro dengan debug mode
react-native start --reset-cache

# Atau di package.json
{
  "scripts": {
    "start:debug": "react-native start --reset-cache --verbose"
  }
}
```

### Metro Cache Issues
```bash
# Clear Metro cache
rm -rf $TMPDIR/metro-cache
rm -rf node_modules/.cache

# Restart Metro
react-native start --reset-cache
```

### Metro Configuration Debugging
```javascript
// metro.config.js - Add logging
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // Add debug logging
  config.resolver.resolveRequest = (context, moduleName, platform) => {
    console.log('Resolving:', moduleName, 'for platform:', platform);
    return context.resolveRequest(context, moduleName, platform);
  };

  return config;
})();
```

## React Native Debugger

### Installation
```bash
# Install React Native Debugger
brew install --cask react-native-debugger

# Atau download dari GitHub releases
# https://github.com/jhen0409/react-native-debugger/releases
```

### Setup React Native Debugger
```javascript
// Di development, enable debugging
if (__DEV__) {
  require('react-native-debugger-open');
}
```

### Manual Connection
```bash
# Start React Native Debugger app
# Then in app, shake device untuk open dev menu
# Tap "Debug" → "Open Debugger"
```

## Chrome DevTools

### Remote Debugging
```javascript
// Enable remote debugging di index.js
if (__DEV__) {
  require('react-native/Libraries/Core/Devtools/openDebugger');
}
```

### Chrome DevTools Features
1. **Console**: Log messages dan errors
2. **Sources**: Debug JavaScript code
3. **Network**: Monitor network requests
4. **Application**: Inspect AsyncStorage, cookies
5. **Performance**: Profile app performance

## Flipper Debugging

### Installation
```bash
# Install Flipper
brew install --cask flipper

# Atau download dari website
# https://fbflipper.com/
```

### Flipper Setup
```javascript
// android/app/src/main/java/com/myapp/MainApplication.java
import com.facebook.flipper.android.utils.FlipperUtils;
import com.facebook.flipper.core.FlipperClient;
import com.facebook.flipper.plugins.inspector.DescriptorMapping;
import com.facebook.flipper.plugins.network.FlipperOkhttpInterceptor;
import com.facebook.flipper.plugins.network.NetworkFlipperPlugin;
import com.facebook.flipper.plugins.react.ReactFlipperPlugin;

public class MainApplication extends Application implements ReactApplication {
  // ... existing code ...

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, false);
    initializeFlipper(this);
  }

  private void initializeFlipper(Context context) {
    if (FlipperUtils.shouldEnableFlipper(this)) {
      FlipperClient client = AndroidFlipperClient.getInstance(this);
      client.addPlugin(new InspectorFlipperPlugin(this, DescriptorMapping.withDefaults()));
      client.addPlugin(new ReactFlipperPlugin());
      client.addPlugin(new DatabasesFlipperPlugin(this));
      client.addPlugin(new SharedPreferencesFlipperPlugin(this));
      client.start();
    }
  }
}
```

### Flipper Plugins
- **React DevTools**: Inspect React component tree
- **Network**: Monitor HTTP requests
- **Databases**: Inspect SQLite databases
- **AsyncStorage**: View app storage
- **Crash Reporter**: View crash logs

## Console Logging

### Advanced Logging
```javascript
// utils/logger.js
const isDev = __DEV__;

export const logger = {
  log: (...args) => {
    if (isDev) {
      console.log('[LOG]', ...args);
    }
  },

  error: (...args) => {
    if (isDev) {
      console.error('[ERROR]', ...args);
    }
    // Send to error reporting service in production
  },

  warn: (...args) => {
    if (isDev) {
      console.warn('[WARN]', ...args);
    }
  },

  info: (...args) => {
    if (isDev) {
      console.info('[INFO]', ...args);
    }
  },

  debug: (...args) => {
    if (isDev) {
      console.debug('[DEBUG]', ...args);
    }
  }
};

// Usage
import { logger } from './utils/logger';

logger.log('User logged in:', user);
logger.error('API call failed:', error);
```

### Performance Logging
```javascript
// utils/performance.js
export const performanceMonitor = {
  start: (label) => {
    if (__DEV__) {
      console.time(label);
    }
  },

  end: (label) => {
    if (__DEV__) {
      console.timeEnd(label);
    }
  },

  measure: (label, fn) => {
    if (__DEV__) {
      console.time(label);
      const result = fn();
      console.timeEnd(label);
      return result;
    }
    return fn();
  }
};

// Usage
import { performanceMonitor } from './utils/performance';

const data = performanceMonitor.measure('API Call', async () => {
  return await fetchUserData();
});
```

## Error Boundaries

### Class Component Error Boundary
```javascript
// components/ErrorBoundary.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error ke service
    console.error('Error Boundary caught an error:', error, errorInfo);

    // Send to error reporting
    // ErrorReporting.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Oops! Something went wrong.</Text>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <TouchableOpacity
            onPress={() => this.setState({ hasError: false, error: null })}
            style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 5 }}
          >
            <Text style={{ color: 'white' }}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### Functional Component Error Boundary (React 18+)
```javascript
// hooks/useErrorBoundary.js
import { useCallback, useState } from 'react';

export function useErrorBoundary() {
  const [error, setError] = useState(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const captureError = useCallback((error) => {
    setError(error);
    // Log to error reporting service
    console.error('Error caught by boundary:', error);
  }, []);

  return { error, resetError, captureError };
}
```

## Network Debugging

### API Call Debugging
```javascript
// utils/api.js
const API_BASE_URL = 'https://api.example.com';

export const apiClient = {
  get: async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('[API] GET:', url, options);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      console.log('[API] Response:', response.status, data);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.message}`);
      }

      return data;
    } catch (error) {
      console.error('[API] Error:', error);
      throw error;
    }
  },

  post: async (endpoint, data, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('[API] POST:', url, data);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(data),
        ...options,
      });

      const responseData = await response.json();
      console.log('[API] Response:', response.status, responseData);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${responseData.message}`);
      }

      return responseData;
    } catch (error) {
      console.error('[API] Error:', error);
      throw error;
    }
  },
};
```

## Device-Specific Debugging

### Android Debugging
```bash
# View Android logs
adb logcat

# Filter React Native logs
adb logcat | grep ReactNative

# Clear logs
adb logcat -c

# Restart adb
adb kill-server && adb start-server
```

### iOS Debugging
```bash
# View iOS device logs (Mac only)
xcrun simctl spawn booted log stream --level debug

# Atau gunakan Console app
# Applications/Utilities/Console.app
```

## Performance Debugging

### Memory Leaks
```javascript
// utils/memoryMonitor.js
export class MemoryMonitor {
  static logMemoryUsage() {
    if (__DEV__) {
      // For debugging memory usage
      console.log('Memory Usage:', performance.memory);
    }
  }

  static startMonitoring(interval = 5000) {
    if (__DEV__) {
      this.interval = setInterval(() => {
        this.logMemoryUsage();
      }, interval);
    }
  }

  static stopMonitoring() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
```

### Component Re-rendering
```javascript
// hooks/useWhyDidYouUpdate.js
import { useEffect, useRef } from 'react';

export function useWhyDidYouUpdate(name, props) {
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changesObj = {};

      allKeys.forEach(key => {
        if (previousProps.current[key] !== props[key]) {
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key]
          };
        }
      });

      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }

    previousProps.current = props;
  });
}

// Usage in component
function MyComponent(props) {
  useWhyDidYouUpdate('MyComponent', props);
  // ... component code
}
```

## Crash Reporting

### Sentry Integration
```bash
npm install @sentry/react-native
```

```javascript
// sentry.js
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_DSN_HERE',
  environment: __DEV__ ? 'development' : 'production',
  beforeSend(event) {
    // Filter sensitive data
    return event;
  },
});

// Usage
Sentry.captureException(new Error('Something went wrong'));
Sentry.captureMessage('Something happened');
```

## Testing Debugging

### Jest Debugging
```javascript
// Add to package.json
{
  "jest": {
    "verbose": true,
    "testEnvironment": "node",
    "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"],
    "collectCoverageFrom": [
      "**/*.{js,jsx,ts,tsx}",
      "!**/node_modules/**",
      "!**/android/**",
      "!**/ios/**"
    ]
  }
}
```

### Detox E2E Debugging
```javascript
// e2e/firstTest.e2e.js
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      launchArgs: {
        detoxDebugVisibility: 'YES', // Show debug indicators
      },
    });
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });
});
```

## Common Issues & Solutions

### 1. Metro Bundler Issues
```
Problem: Metro stuck on "Loading dependency graph"
Solution: rm -rf $TMPDIR/metro-cache && react-native start --reset-cache
```

### 2. Android Build Issues
```
Problem: Build failed with "Could not find method implementation()"
Solution: Update Gradle version in android/build.gradle
```

### 3. iOS Build Issues
```
Problem: CocoaPods install failed
Solution: cd ios && rm -rf Pods && pod install
```

### 4. Hot Reload Not Working
```
Problem: Changes not reflecting
Solution: Shake device → Dev Menu → Disable/Enable Hot Reload
```

### 5. Network Requests Failing
```
Problem: API calls not working
Solution: Check network permissions in AndroidManifest.xml and Info.plist
```

## Best Practices

1. **Consistent Logging**: Use structured logging throughout app
2. **Error Boundaries**: Wrap critical components with error boundaries
3. **Performance Monitoring**: Monitor memory usage dan render performance
4. **Network Debugging**: Log all network requests dan responses
5. **Crash Reporting**: Implement crash reporting untuk production
6. **Testing**: Write tests untuk catch issues early
7. **Documentation**: Document known issues dan solutions

## Summary

Debugging React Native melibatkan:
- **Metro Bundler**: Cache management dan configuration
- **Debuggers**: React Native Debugger, Chrome DevTools, Flipper
- **Logging**: Structured logging untuk development dan production
- **Error Handling**: Error boundaries dan crash reporting
- **Performance**: Memory monitoring dan performance profiling
- **Network**: API debugging dan network inspection

Dengan tools dan practices yang tepat, debugging menjadi lebih efisien dan issues bisa diselesaikan lebih cepat. 