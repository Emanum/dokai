# DOKAI - DOkument AI

A simple demo to demonstrate [OCR-free Document Understanding Transformer
](https://arxiv.org/abs/2111.15664). Runs on GPU lambda functions via modal.com


## Requirements

- Python 3.10
- Github Account linked to Modal.com (you get a 30 dollar free credits each month)

## Components

There are just two components for the cloud version
* **dokai.py** - Which is the actual pipeline that runs the stable diffusion pipeline and hosts a webserver to trigger the style transfer and static HTML files
* **frontend/*** - The frontend files that are served by the webserver. A one-page HTML side with alpinejs and tailwindcss

## Setup

```bash
pip install modal
```

Afterward, create a token

```bash
modal token new
```

Then you can either serve a dev version temporarily or deploy a stable version.

***Dev Version***


```bash
modal serve dokai.py
```

***Stable Version***

```bash
modal deploy dokai.py
```