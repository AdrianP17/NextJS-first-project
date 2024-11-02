import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/prisma";
import next from "next";

export async function GET(request, { params }) {	
    const task = await prisma.task.findUnique({
        where: {
            id: parseInt(params.id), // params.id
        }
    })
    return NextResponse.json(task);
}

export async function PUT(request, { params }) {	
    const data = await request.json();
    const task = await prisma.task.update({
        where: {
            id: parseInt(params.id)
        },
        data: data
    })

    return NextResponse.json(task);
}

export async function DELETE(request, { params }) {	
    try {
        const taskRemoved = await prisma.task.delete({
            where: {
                id: parseInt(params.id)
            }
        })
        return NextResponse.json(taskRemoved);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }

    
}