using System;
using System.Collections;
using System.Collections.Generic;
using BestHTTP.WebSocket;
using UnityEngine;

public class WsImgStreaming : MonoBehaviour
{
    // public
    public Material streamingMtl;


    // private
    WebSocket ws;
    Texture2D wsTex;

    // Start is called before the first frame update
    void Start()
    {
        wsTex = new Texture2D(1, 1);

        // Create the WebSocket instance
        ws = new WebSocket(new Uri("ws://127.0.0.1:8080"));

        // Subscribe to the WS events
        ws.OnOpen += OnOpen;
        ws.OnMessage += OnMessageReceived;
        //ws.OnClosed += OnClosed;
        //ws.OnError += OnError;

        // Start connecting to the server
        ws.Open();

    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void OnOpen(WebSocket ws)
    {
        Debug.Log("Connected!!");
    }

    void OnMessageReceived(WebSocket ws, string message)
    {
        //Debug.Log(message);
        byte[] bytes = Convert.FromBase64String(message.Substring(22));
        wsTex.LoadImage(bytes);
        streamingMtl.mainTexture = wsTex;

    }
}
