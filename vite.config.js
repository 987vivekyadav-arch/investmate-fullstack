import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({

    plugins:[
        react(),

        VitePWA({

            registerType:"autoUpdate",

            manifest:{
                name:"InvestMate",
                short_name:"InvestMate",
                description:"Investment tracking app",
                theme_color:"#111118",
                background_color:"#111118",
                display:"standalone",

                icons:[
                    {
                        src:"/pwa-192x192.png",
                        sizes:"192x192",
                        type:"image/png"
                    },
                    {
                        src:"/pwa-512x512.png",
                        sizes:"512x512",
                        type:"image/png"
                    }
                ]
            }

        })

    ]

})