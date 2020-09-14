export default {

  init (config) {
    const canvas = config.el

    if (!canvas) { return }
    const ctx = canvas.getContext('2d')

    const canvasWidth = 600
    const canvasHeight = 800

    const filled = config.filled

    const gridConfig = {
      horizontal: config.horizontal,
      vertical: config.vertical,
      width: canvasWidth / config.horizontal,
      height: canvasHeight / config.vertical
    }

    const completed = (new Set(filled)).size >= config.horizontal * config.vertical

    const defineGrid = () => {
      const grid = []

      for (let i = 0; i < gridConfig.vertical; i++) {
        for (let j = 0; j < gridConfig.horizontal; j++) {
          grid.push({
            x: j,
            y: i,
            active: filled.includes(i * gridConfig.horizontal + (j + 1))
          })
        }
      }

      return grid
    }

    const grid = defineGrid()

    const drawGrid = (img) => {
      grid.forEach((cell) => {
        if (cell.active) {
          ctx.drawImage(
            img,
            cell.x * gridConfig.width,
            cell.y * gridConfig.height,
            gridConfig.width,
            gridConfig.height,
            cell.x * gridConfig.width,
            cell.y * gridConfig.height,
            gridConfig.width,
            gridConfig.height
          )
        }

        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 1
        ctx.strokeRect(
          cell.x * gridConfig.width,
          cell.y * gridConfig.height,
          gridConfig.width,
          gridConfig.height
        )

        ctx.strokeStyle = cell.active ? 'hsla(231, 75%, 59%, .5)' : 'rgba(255, 255, 255, 0.2)'
        ctx.lineWidth = 12
        ctx.strokeRect(
          cell.x * gridConfig.width,
          cell.y * gridConfig.height,
          gridConfig.width,
          gridConfig.height
        )
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
      })
    }

    const baseImage = new Image()
    baseImage.src = config.image
    baseImage.onload = function () {
      if (!completed) {
        ctx.filter = 'grayscale(100%) opacity(0.4)'
      }

      ctx.drawImage(baseImage, 0, 0)

      if (!completed) {
        ctx.filter = 'grayscale(0%)'
        drawGrid(baseImage)
      }

      if (completed) {
        ctx.fillStyle = 'hsla(231, 75%, 59%, .2)'
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)
      }
    }

    return completed
  }
}
