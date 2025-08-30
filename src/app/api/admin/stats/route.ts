import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import Skill from '@/models/Skill';
import Contact from '@/models/Contact';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const userPayload = getUserFromRequest(request);
    if (!userPayload || userPayload.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const [totalProjects, totalSkills, unreadMessages] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Contact.countDocuments({ read: false }),
    ]);

    return NextResponse.json({
      totalProjects,
      totalSkills,
      unreadMessages,
      totalViews: Math.floor(Math.random() * 10000) + 5000, // Mock data for now
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}