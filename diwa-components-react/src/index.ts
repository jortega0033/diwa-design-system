// Re-export everything from the Stencil-generated proxies.
export * from './components';

// D* aliases — the public API name consumers should use.
// The Diwa* variants remain available for backwards compatibility.
export { DiwaBadge as DBadge } from './components';
export { DiwaButton as DButton } from './components';
export { DiwaInput as DInput } from './components';
export { DiwaSpinner as DSpinner } from './components';
