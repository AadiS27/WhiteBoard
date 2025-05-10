import { title } from "process";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args:{
        orgId:v.string(),
        title:v.string(),
    },
    handler:async(ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated")
        }

        const board=await ctx.db.insert("boards",{
            title:args.title,
            orgId:args.orgId,
            authorId:identity.subject,
            authorName:identity.name!,
            imageUrl:"",
        });
        return board;
    }
})

export const remove= mutation({
    args:{id:v.id("boards")},
    handler:async(ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated")
        }
       
        const userId=identity.subject;

        const existingFavourite=await ctx.db.query("userFavorites")
        .withIndex("by_user_board",(q)=>
        q
        .eq("userId",userId)
        .eq("boardId",args.id)
        ).unique();

        if(existingFavourite){
            await ctx.db.delete(existingFavourite._id);
        }
        await ctx.db.delete(args.id);
    }


})

export const update =mutation({
    args:{
        id:v.id("boards"),
        title:v.string(),
    },
    handler:async(ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated")
        }
       const title=args.title.trim();
       if(!title){
            throw new Error("Title cannot be empty")
        }
         if(title.length>50){
                throw new Error("Title cannot be more than 50 characters")
          }
       const board= await ctx.db.patch(args.id,{
            title:args.title,
        })
        return board;
    }
})

export const favourite=mutation({
    args:{id:v.id("boards"),orgId:v.string()},
    handler:async(ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated")
        }

        const board=await ctx.db.get(args.id);

        if(!board){
            throw new Error("Board not found")
        }

        const userId=identity.subject;

        const existingFavourite=await ctx.db.query("userFavorites").withIndex
        ("by_user_board_org",(q)=>
        q
        .eq("userId",userId)
        .eq("boardId",board._id)
        .eq("orgId",args.orgId)

    )
    .unique();

    if(existingFavourite){
        throw new Error("Already favourited")
    }
   
    await ctx.db.insert("userFavorites",{
        userId,
        orgId:args.orgId,
        boardId:board._id,
    });
    return board;
    }
    })

    
export const unfavourite=mutation({
    args:{id:v.id("boards")},
    handler:async(ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated")
        }

        const board=await ctx.db.get(args.id);

        if(!board){
            throw new Error("Board not found")
        }

        const userId=identity.subject;

        const existingFavourite=await ctx.db.query("userFavorites").withIndex
        ("by_user_board",(q)=>
        q
        .eq("userId",userId)
        .eq("boardId",board._id)
        
    )
    .unique();

    if(!existingFavourite){
        throw new Error("favourite not found")
    }
   
    await ctx.db.delete(existingFavourite._id);
    return board;
    }
    })

    export const get=query({
        args:{id:v.id("boards")},
        handler:async(ctx,args)=>{
        const board=await ctx.db.get(args.id);
        return board;
    }
    })