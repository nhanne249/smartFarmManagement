require('dotenv').config()

const axios = require('axios')
const user_name = process.env.ADAFRUIT_IO_USERNAME
const ada_key = process.env.ADAFRUIT_IO_KEY
const feed_fan = "bbc-fan"
const feed_pump = "bbc-pump"

const getSTT = {
    getSTT: async (req, res) => {
        try {
            let feed = feed_fan
            if (req.query.value == "pump") feed = feed_pump
            let url = `https://io.adafruit.com/api/v2/${user_name}/feeds/${feed}/data/last`
            let result = await axios.get(url, {
                headers: {
                    'X-AIO-Key': ada_key
                }
            })
            let val = result.data.value
            res.json({ value: val })
        } catch (error) {
            res.status(500).json({ error: "Lỗi khi lấy được dữ liệu!!!" })
        }
    }
}

module.exports = getSTT;