import type {Handler, Request, Response, RequestHandler} from 'express'
import type {Author} from "@prisma/client";
import {invalidAuthor} from "./utils";
import {Create, Delete, getAll, Read, Update} from "./authors-crud";

const error400 = {msg: 'Error bad Request'}

export const CreateHandler: RequestHandler = (req, res) => {
   const data = req.body
   console.log(req.body, data)
   data.photo = Buffer.from(data.photo)
   if (
       invalidAuthor(data)
   ) {
      console.log('Create Author: Invalid Author', data)
      res.status(400).send(error400)
   } else {
      Create(data).then(d => {
         console.log('Create Author: Success', data)
         res.status(201).send(d)
      }).catch((e) => {
         //console.log(e)
         console.log('Create Author: Internal Error', data)
         res.status(500).send(e)
      })
   }
}

export const ReadAllHandler = (_: Request, res: Response) => {
   getAll().then((d) => {
      res.status(200).send(d)
   }).catch((e) => {
      res.status(500).send(e)
   })
}

export const ReadHandler: RequestHandler = (req, res) => {
   const id = parseInt(req.query.id.toString())
   console.log(id);
   if (
       !id 
   ) {
      console.log(typeof(id), !id, id)
      res.status(400).send(error400)
   } else {
      Read(id).then(d => {
         if(d){
            res.status(200).send(d)
         } else {
            res.status(404).send(d)
         }
      }).catch((e) => {
         res.status(404).send(e)
      })
   }
}
export const UpdateHandler: RequestHandler = (req, res) => {
   const data = req.body.data as Author
   if (data.photo) {
      data.photo = Buffer.from(data.photo)
   }
   delete data['id']
   const id = req.body.id
   if (
      !data || !id || typeof(id) !== "number"
   ) {
      res.status(400).send(error400)
   } else {
      Update(data, id).then(d => {
         res.status(201).send(d)
      }).catch((e) => {
         console.log(e)
         res.status(500).send(e)
      })
   }
}
export const DeleteHandler: RequestHandler = (req, res) => {
   const id = parseInt(req.query.id.toString())
   if (
       !id || typeof(id) !== "number"
   ) {
      console.log(id, typeof(id))
      res.status(400).send(error400)
   } else {
      Delete(id).then(d => {
         res.status(201).send(d)
      }).catch((e) => {
         res.status(500).send(e)
      })
   }
}
