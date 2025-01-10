import { NativeRouter } from 'react-router-native';
import Main from './src/Main';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}
