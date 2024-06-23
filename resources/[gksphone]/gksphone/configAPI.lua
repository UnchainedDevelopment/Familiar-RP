Cfg = {}

--- ### TEBEX - MUSIC - PlayTube  ### ---

Cfg.TebexTransactionID = "tbx-2604124a22085-f9739d" --- Required for PlayTube and Music app. (example : tbx-5addc-555)

-- Discrod Webhooks - start --

Cfg.MessagesWebhook = false
Cfg.CallWebhooks    = false

--## To use the media service of gkshop => GKSMedia (https://service.gkshop.org/package/5563991)
Cfg.MediaServices   = "discord" --- ## gkshop(picture,audio,video), discord(picture,audio,video), imgur(only picture), imgbb(only picture)
Cfg.MediaToken      = ""        --- ## Media Service Token (if you are using discord leave this blank)

Cfg.VoiceMail       = "DISCORD WEBHOOK"
Cfg.PhotoWebHook    = "DISCORD WEBHOOK"
Cfg.Carseller       = 'DISCORD WEBHOOK'
Cfg.NewCarSeller    = 'DISCORD WEBHOOK'
Cfg.JobNotif        = 'DISCORD WEBHOOK'
Cfg.TwitterWeb      = 'DISCORD WEBHOOK'
Cfg.YellowWeb       = 'DISCORD WEBHOOK'
Cfg.InstagramWeb    = 'DISCORD WEBHOOK'
Cfg.Crypto          = 'DISCORD WEBHOOK'
Cfg.BankTransfer    = 'DISCORD WEBHOOK'
Cfg.RaceWinning     = 'DISCORD WEBHOOK'
Cfg.RaceCreate      = 'DISCORD WEBHOOK'
Cfg.MessageWeb      = 'DISCORD WEBHOOK'
Cfg.CallWebhook     = 'DISCORD WEBHOOK'
Cfg.JobApplication  = "DISCORD WEBHOOK"
Cfg.NewsWebook      = "DISCORD WEBHOOK"
Cfg.NewBilling      = "DISCORD WEBHOOK"
Cfg.BankLimit       = 5000 -- # Minimum money transfer for Discrod Webhook
Cfg.ExploitWebhook  = 'DISCORD WEBHOOK'
Cfg.LiveDonate      = "DISCORD WEBHOOK"


Cfg.PlayerInfo = true -- (Instagram, Yellow Pages, Twitter)
-- Discrod Webhooks - end --

