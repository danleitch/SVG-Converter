/**
 * We capture the SVG in the DOM through the wrapper and convert it into an object using blob(), we create an 'a' element and add 'blob as href', 'download as filename' to its attributes. It is now ready to be clicked on and the image downloaded. Lastly, the browser does not know we are done so we have to manually clear the allocated memory by removing the 'blob' object from it.
 *
 * @param svg: string
 * @returns Promise null
 */

export const downloadSVG = async (svg: string): Promise<null> => {
  const blob = new Blob([svg], { type: 'image/svg+xml' })

  const objectUrl = URL.createObjectURL(blob)
  const element = document.createElement('a')
  element.href = objectUrl
  element.download = `QRCode.svg`
  element.click()

  setTimeout(() => URL.revokeObjectURL(objectUrl), 5000)
  return Promise.resolve(null)
}

/**
 * We capture the SVG in the DOM through the wrapper and convert SVG String to DataURL, next we generate a Blob image of a custom size from a SVGDataURL. We create an abstract canvas, Create an image element to load the SVG, we set the dimensions and render it to the canvas we export the canvas to blob, we load the DataURL of the SVG into the img src. Next, we create an 'a' element and then pass it 'blob as href', and 'download as file name' for attributes. It is now ready to be clicked on and the image downloaded. Lastly, the browser does not know we are done so we have to manually clear the allocated memory by removing the 'blob' object from it.
 *
 * @param svg: string (SVG)
 * @returns: void
 */
export const downloadPNG = (svg: string): Promise<null> => {
  const dataURL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  // Creating Elements
  const anchorElement = document.createElement('a')
  const imgElement = document.createElement('img')

  const GenerateImageBlobFromSVG = SVGDataURL => {
    return new Promise(resolve => {
      const size = 1024
      // Creating an abstract canvas
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      // Create an image element to load the SVG onto
      const img = new Image()

      // Size and render
      img.onload = () => {
        img.width = size
        img.height = size

        canvas.width = img.width
        canvas.height = img.height

        ctx.drawImage(img, 0, 0, img.width, img.height)

        canvas.toBlob(blob => {
          resolve(blob)
        })
      }
      img.src = SVGDataURL
      return Promise.resolve(null)
    })
  }

  GenerateImageBlobFromSVG(dataURL).then(blob => {
    const fileURL = window.URL.createObjectURL(blob)
    // Mutating 'a'
    anchorElement.href = fileURL
    anchorElement.appendChild(imgElement)
    anchorElement.download = `QRCode.png`
    anchorElement.click()

    // Clean up
    setTimeout(() => anchorElement.remove(), 5000)
    setTimeout(() => URL.revokeObjectURL(fileURL), 5000)
  })
  return Promise.resolve(null)
}
