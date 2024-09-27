---
layout: plugin

id: caselightcontrol
title: OctoPrint-CaseLightControl
description: Control case light via M355
authors:
- bgpat
license: AGPLv3

date: 2024-09-27

homepage: https://github.com/bgpat/OctoPrint-CaseLightControl
source: https://github.com/bgpat/OctoPrint-CaseLightControl
archive: https://github.com/bgpat/OctoPrint-CaseLightControl/archive/master.zip

tags:
- light
- control

screenshots:
- url: /assets/img/plugins/caselightcontrol/screenshot.png
  alt: screenshot
  caption: Case Light Control

featuredimage: /assets/img/plugins/caselightcontrol/screenshot.png

compatibility:
  octoprint:
  - 1.4.0
  os:
  - linux
  - windows
  - macos
  - freebsd
  python: ">=3,<4"

---

This plugin controls the brightness of the case light via `M355` G-code command.
