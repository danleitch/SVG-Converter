const component = () => {
  // Extracting the SVG through the wrappping div 
    const svgRef = React.useRef<HTMLDivElement>(null)

  return (
    <div>
        <div ref={svgRef}>
          <SVG/>
        </div>
{/* Download button passing in the SVG as props */}
          <DownloadButtons
            handleSvgDownload={() => downloadSVG(svgRef.current.innerHTML)}
            handlePngDownload={() => downloadPNG(svgRef.current.innerHTML)}
          />
    </div>
  )
}

export default QRCode
