
export default options => {
  // default options
  const defaultOption = {
    container: null,
    autoplay: false,
    loop: false,
    preload: 'metadata',
    volume: 0.7,
    src: null,
    video: null,
    mutex: true
  }
  for (const defaultKey in defaultOption) {
    if (
      defaultOption.hasOwnProperty(defaultKey) &&
      !options.hasOwnProperty(defaultKey)
    ) {
      options[defaultKey] = defaultOption[defaultKey]
    }
  }

  return options
}
