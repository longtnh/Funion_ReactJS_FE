interface Schedule {
  startDate: string
  subEventInDate: SubEventInDate[]
}

interface Event {
  id: string
  name: string
  logoImageFilePath: string
  categoryId: string
  startTime: string
  endTime: string
  subEvents: SubEvent[]
}

interface SubEvent {
  id: string
  status: string
  streamSessionId: string
  startTime: string
}

interface ResCreateEventApi extends Res {
  data: {
    Name: string
    CategoryId: string
    StartTime: string
    EndTime: string
    File: File
  }
}

interface ResAddSubEvent extends Res {
  data: {
    eventId: string
    status: string
    startTime: string
  }
}

interface ResDeleteSubEvent extends Res {
  data: {
    subEventId: string
  }
}

interface ResFollowSubEvent extends Res {
  data: {
    subEventId: string
  }
}
