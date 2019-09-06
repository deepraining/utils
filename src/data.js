/* eslint-disable import/prefer-default-export */
import { parseUrlSearch } from './func';
/**
 * url 参数
 */
export const urlParams = parseUrlSearch(window.location.search);
