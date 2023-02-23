/* global */
import { paramStore } from '../stores/ParamStore';
import { uiStore } from '../stores/UiStore';
import { targetConnectionStore } from '../stores/TargetConnectionStore';
import { accountStore } from '../stores/AccountStore';
import { themeStore } from '../stores/ThemeStore';
import { menuStore } from '../stores/MenuStore';
import { commonStore } from '../stores/CommonStore';
import { utilStore } from '../stores/UtilStore';
import { hanwhaStore } from '../stores/HanwhaStore';
import { connectionStore } from '../stores/ConnectionStore';
import { cookieStore } from '../stores/CookieStore';

const useStore = () => {
  return {
    paramStore,
    uiStore,
    targetConnectionStore,
    accountStore,
    themeStore,
    menuStore,
    commonStore,
    hanwhaStore,
    utilStore,
    connectionStore,
    cookieStore
  };
};

export default useStore;