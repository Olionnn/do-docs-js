# Navigation dan State Management

## Overview
Navigation dan state management adalah komponen penting dalam aplikasi React Native. Navigation mengatur perpindahan antar screen, sedangkan state management mengatur data aplikasi.

## React Navigation

### Installation
```bash
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install @react-navigation/drawer
```

### Stack Navigation (Screen berlapis)

```javascript
// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Beranda' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profil',
            headerStyle: { backgroundColor: '#f4511e' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={({ route }) => ({
            title: route.params?.title || 'Pengaturan'
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Tab Navigation (Bottom tabs)

```javascript
// TabNavigator.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#f4511e',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
```

### Drawer Navigation (Side menu)

```javascript
// DrawerNavigator.js
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Beranda',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          drawerLabel: 'Notifikasi',
          drawerBadge: 3,
        }}
      />
    </Drawer.Navigator>
  );
}
```

## State Management dengan Context API

### Basic Context Setup

```javascript
// contexts/AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        isLoading: false,
        isSignout: false,
        userToken: action.token,
        user: action.user,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isLoading: false,
        isSignout: true,
        userToken: null,
        user: null,
      };
    case 'RESTORE_TOKEN':
      return {
        ...state,
        isLoading: false,
        userToken: action.token,
        user: action.user,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
    user: null,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let user;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        user = JSON.parse(await AsyncStorage.getItem('user'));
      } catch (e) {
        // Restoring token failed
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken, user });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // API call untuk login
        const response = await fetch('https://api.example.com/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();

        if (result.token) {
          await AsyncStorage.setItem('userToken', result.token);
          await AsyncStorage.setItem('user', JSON.stringify(result.user));
          dispatch({ type: 'SIGN_IN', token: result.token, user: result.user });
        }
      },
      signOut: async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('user');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        // API call untuk register
        const response = await fetch('https://api.example.com/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();

        if (result.token) {
          await AsyncStorage.setItem('userToken', result.token);
          await AsyncStorage.setItem('user', JSON.stringify(result.user));
          dispatch({ type: 'SIGN_IN', token: result.token, user: result.user });
        }
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ ...state, ...authContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Using Context in Components

```javascript
// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn({ email, password });
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Button
        title={isLoading ? 'Loading...' : 'Login'}
        onPress={handleLogin}
        disabled={isLoading}
      />
    </View>
  );
}
```

## Redux State Management

### Installation
```bash
npm install redux react-redux @reduxjs/toolkit
```

### Redux Store Setup

```javascript
// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Redux Slice Example

```javascript
// features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk untuk fetch user
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
```

### Using Redux in Components

```javascript
// components/UserProfile.js
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../features/user/userSlice';

export default function UserProfile({ userId }) {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [userId, dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!currentUser) {
    return <Text>No user data</Text>;
  }

  return (
    <View>
      <Text>Name: {currentUser.name}</Text>
      <Text>Email: {currentUser.email}</Text>
      <Text>Role: {currentUser.role}</Text>
    </View>
  );
}
```

## Navigation dengan State Management

### Combining Navigation and Redux

```javascript
// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './store';
import { useAuth } from './contexts/AuthContext';
import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { userToken, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </Provider>
  );
}
```

## Deep Linking

### Setup Deep Linking

```javascript
// App.js
import { Linking } from 'react-native';

const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Home: 'home',
      Profile: {
        path: 'profile/:userId',
        parse: {
          userId: (userId) => `${userId}`,
        },
      },
      Settings: 'settings',
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      {/* Your navigators */}
    </NavigationContainer>
  );
}
```

### Handle Deep Links

```javascript
// useDeepLink.js
import { useEffect } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function useDeepLink() {
  const navigation = useNavigation();

  useEffect(() => {
    const handleDeepLink = (event) => {
      const { url } = event;
      // Parse URL dan navigate
      if (url.includes('profile')) {
        const userId = url.split('/').pop();
        navigation.navigate('Profile', { userId });
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    // Check initial URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, [navigation]);
}
```

## Best Practices

### Navigation Best Practices
1. **Consistent Navigation Structure**: Gunakan nested navigators untuk complex apps
2. **Type Safety**: Gunakan TypeScript untuk navigation params
3. **Loading States**: Handle loading states saat navigate
4. **Error Boundaries**: Wrap navigators dengan error boundaries
5. **Accessibility**: Pastikan navigation accessible

### State Management Best Practices
1. **Single Source of Truth**: Pilih satu state management solution
2. **Normalize Data**: Normalize nested data structures
3. **Memoization**: Use selectors untuk computed data
4. **Persistence**: Persist important state ke AsyncStorage
5. **Testing**: Test state changes dan side effects

### Performance Tips
1. **Lazy Loading**: Load screens on demand
2. **Memoization**: Memoize expensive computations
3. **Debouncing**: Debounce frequent state updates
4. **Bundle Splitting**: Split code untuk faster loading

## Summary

Navigation dan state management melibatkan:
- **React Navigation**: Stack, Tab, Drawer navigators
- **Context API**: Simple state management untuk small apps
- **Redux**: Advanced state management untuk complex apps
- **Deep Linking**: Handle external links dan push notifications
- **Performance**: Optimize dengan lazy loading dan memoization

Pilih approach yang sesuai dengan complexity aplikasi Anda. Context API cukup untuk apps kecil, Redux untuk apps kompleks dengan banyak state interactions. 